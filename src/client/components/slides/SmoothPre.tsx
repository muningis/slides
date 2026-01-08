/**
 * SmoothPre - Class component for token transitions
 * Based on CodeHike's token-transitions documentation
 */

import React from "react";
import {
  type CustomPreProps,
  InnerPre,
  getPreRef,
  type AnnotationHandler,
  InnerToken,
} from "codehike/code";
import {
  type TokenTransitionsSnapshot,
  calculateTransitions,
  getStartingSnapshot,
} from "codehike/utils/token-transitions";

const MAX_TRANSITION_DURATION = 900; // milliseconds

/**
 * Class component that captures snapshots before updates
 * and animates token transitions
 */
export class SmoothPre extends React.Component<CustomPreProps> {
  ref: React.RefObject<HTMLPreElement>;

  constructor(props: CustomPreProps) {
    super(props);
    this.ref = getPreRef(this.props);
  }

  override render(): React.ReactNode {
    return <InnerPre merge={this.props} style={{ position: "relative" }} />;
  }

  override getSnapshotBeforeUpdate(): TokenTransitionsSnapshot | null {
    if (!this.ref.current) return null;
    return getStartingSnapshot(this.ref.current);
  }

  override componentDidUpdate(
    _prevProps: CustomPreProps,
    _prevState: never,
    snapshot: TokenTransitionsSnapshot | null
  ): void {
    if (!snapshot || !this.ref.current) return;

    const transitions = calculateTransitions(this.ref.current, snapshot);

    transitions.forEach(({ element, keyframes, options }) => {
      const { translateX, translateY, color, opacity } = keyframes;

      // Build keyframes array for Web Animations API
      const animKeyframes: Keyframe[] = [];

      // First keyframe (from state)
      const fromKeyframe: Keyframe = {};
      // Second keyframe (to state)
      const toKeyframe: Keyframe = {};

      if (translateX && translateY) {
        fromKeyframe.translate = `${translateX[0]}px ${translateY[0]}px`;
        toKeyframe.translate = `${translateX[1]}px ${translateY[1]}px`;
      }

      if (color) {
        fromKeyframe.color = color[0];
        toKeyframe.color = color[1];
      }

      if (opacity) {
        fromKeyframe.opacity = opacity[0];
        toKeyframe.opacity = opacity[1];
      }

      animKeyframes.push(fromKeyframe, toKeyframe);

      element.animate(animKeyframes, {
        duration: options.duration * MAX_TRANSITION_DURATION,
        delay: options.delay * MAX_TRANSITION_DURATION,
        easing: options.easing,
        fill: "both",
      });
    });
  }
}

/**
 * Annotation handler for token transitions
 * Pass this to the Pre component's handlers prop
 */
export const tokenTransitions: AnnotationHandler = {
  name: "token-transitions",
  PreWithRef: SmoothPre,
  Token: (props) => (
    <InnerToken merge={props} style={{ display: "inline-block" }} />
  ),
};
