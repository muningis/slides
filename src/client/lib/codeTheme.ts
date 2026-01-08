/**
 * Custom CodeHike theme - Military-tech aesthetic
 * Dark olive backgrounds with lime accents and sand text
 */

import type { RawTheme } from "@code-hike/lighter";

export const militaryTechTheme: RawTheme = {
  name: "military-tech",
  type: "dark",
  colors: {
    // Editor colors - near black
    "editor.background": "#0a0c0a",
    "editor.foreground": "#d4c9a8",
    "editorLineNumber.foreground": "#353d2d",
    "editorCursor.foreground": "#c8f542",
    "editor.selectionBackground": "#252a1e",
  },
  tokenColors: [
    // Comments - muted sand
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#6b7260",
        fontStyle: "italic",
      },
    },
    // Keywords - lime accent
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
        "keyword.operator.logical",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "#c8f542",
      },
    },
    // Strings - dimmer lime
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: {
        foreground: "#a8d435",
      },
    },
    // Numbers - bright sand
    {
      scope: ["constant.numeric", "constant.language"],
      settings: {
        foreground: "#e8dcc0",
      },
    },
    // Functions - brightest sand
    {
      scope: [
        "entity.name.function",
        "meta.function-call",
        "support.function",
      ],
      settings: {
        foreground: "#f5f0e0",
      },
    },
    // Types - lighter lime
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: {
        foreground: "#b8e040",
      },
    },
    // Variables - sand
    {
      scope: [
        "variable",
        "variable.other",
        "variable.parameter",
        "meta.definition.variable",
      ],
      settings: {
        foreground: "#d4c9a8",
      },
    },
    // Properties - light sand
    {
      scope: [
        "variable.other.property",
        "meta.object-literal.key",
        "support.type.property-name",
      ],
      settings: {
        foreground: "#c9bea0",
      },
    },
    // Operators - medium sand
    {
      scope: ["keyword.operator", "punctuation"],
      settings: {
        foreground: "#9a9080",
      },
    },
    // Constants - lime variant
    {
      scope: ["constant.language.boolean", "constant.language.null"],
      settings: {
        foreground: "#c8f542",
      },
    },
    // Import/export - lime
    {
      scope: ["keyword.control.import", "keyword.control.export"],
      settings: {
        foreground: "#c8f542",
      },
    },
    // Punctuation brackets - muted
    {
      scope: [
        "punctuation.bracket",
        "punctuation.definition.block",
        "meta.brace",
      ],
      settings: {
        foreground: "#7a7060",
      },
    },
    // Template literals
    {
      scope: ["punctuation.definition.template-expression"],
      settings: {
        foreground: "#c8f542",
      },
    },
    // HTML/JSX tags
    {
      scope: ["entity.name.tag", "punctuation.definition.tag"],
      settings: {
        foreground: "#c8f542",
      },
    },
    // HTML/JSX attributes
    {
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "#b8e040",
      },
    },
  ],
};
