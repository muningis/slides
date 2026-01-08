/**
 * useHighlight - Hook for async syntax highlighting with CodeHike
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { highlight, type HighlightedCode } from "codehike/code";
import { militaryTechTheme } from "../lib/codeTheme.ts";

// Cache highlighted code to avoid re-highlighting
const highlightCache = new Map<string, HighlightedCode>();

function getCacheKey(code: string, lang: string): string {
  return `${lang}:${code}`;
}

export interface UseHighlightResult {
  highlighted: HighlightedCode | null;
  isLoading: boolean;
  error: Error | null;
}

type HighlightState = {
  highlighted: HighlightedCode | null;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook to asynchronously highlight code using CodeHike
 */
export function useHighlight(code: string, lang: string): UseHighlightResult {
  const cacheKey = getCacheKey(code, lang);
  const cachedValue = highlightCache.get(cacheKey);

  const [state, setState] = useState<HighlightState>(() => ({
    highlighted: cachedValue ?? null,
    isLoading: !cachedValue,
    error: null,
  }));

  const requestIdRef = useRef(0);

  useEffect(() => {
    // Skip if already cached
    if (highlightCache.has(cacheKey)) {
      return;
    }

    const requestId = ++requestIdRef.current;

    // Use microtask to avoid synchronous setState in effect
    queueMicrotask(() => {
      if (requestId !== requestIdRef.current) return;
      setState((s) => ({ ...s, isLoading: true, error: null }));
    });

    highlight({ value: code, lang, meta: "" }, militaryTechTheme)
      .then((result) => {
        if (requestId === requestIdRef.current) {
          highlightCache.set(cacheKey, result);
          setState({ highlighted: result, isLoading: false, error: null });
        }
      })
      .catch((err) => {
        if (requestId === requestIdRef.current) {
          setState({
            highlighted: null,
            isLoading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          });
        }
      });
  }, [code, lang, cacheKey]);

  // Return cached value if available
  if (cachedValue) {
    return { highlighted: cachedValue, isLoading: false, error: null };
  }

  return state;
}

/**
 * Hook to highlight multiple code blocks
 */
export function useHighlightAll(
  blocks: readonly string[],
  lang: string
): {
  highlights: (HighlightedCode | null)[];
  isLoading: boolean;
  error: Error | null;
} {
  // Memoize blocks array to stable reference
  const stableBlocks = useMemo(() => [...blocks], [blocks]);

  // Check cache synchronously during render
  const cachedHighlights = useMemo(() => {
    return stableBlocks.map((code) => {
      const cacheKey = getCacheKey(code, lang);
      return highlightCache.get(cacheKey) ?? null;
    });
  }, [stableBlocks, lang]);

  const allCached = cachedHighlights.every((h) => h !== null);

  const [state, setState] = useState<{
    highlights: (HighlightedCode | null)[];
    isLoading: boolean;
    error: Error | null;
  }>(() => ({
    highlights: cachedHighlights,
    isLoading: !allCached,
    error: null,
  }));

  const requestIdRef = useRef(0);

  useEffect(() => {
    // Skip if all cached
    if (allCached) {
      return;
    }

    const requestId = ++requestIdRef.current;

    // Use microtask to avoid synchronous setState in effect
    queueMicrotask(() => {
      if (requestId !== requestIdRef.current) return;
      setState((s) => ({ ...s, isLoading: true, error: null }));
    });

    Promise.all(
      stableBlocks.map(async (code) => {
        const cacheKey = getCacheKey(code, lang);
        const cached = highlightCache.get(cacheKey);
        if (cached) return cached;

        const result = await highlight(
          { value: code, lang, meta: "" },
          militaryTechTheme
        );
        highlightCache.set(cacheKey, result);
        return result;
      })
    )
      .then((results) => {
        if (requestId === requestIdRef.current) {
          setState({ highlights: results, isLoading: false, error: null });
        }
      })
      .catch((err) => {
        if (requestId === requestIdRef.current) {
          setState({
            highlights: cachedHighlights,
            isLoading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          });
        }
      });
  }, [stableBlocks, lang, allCached, cachedHighlights]);

  // Return cached values if all available
  if (allCached) {
    return { highlights: cachedHighlights, isLoading: false, error: null };
  }

  return state;
}
