// Shared mutable state between the DOM (stage, bubble, hologram modal) and the
// WebGL frame loop. It is a plain object on purpose: pointer movement, hovering
// and modal events never trigger React re-renders of the robot.

export const now = () => performance.now() / 1000

export const robot = {
  pointer: { x: 0, y: 0, has: false, movedAt: 0 },
  hovered: false,
  hoverAt: 0,
  pressed: false,
  reduced: false,

  // "Showing the hologram" mode while the projects modal is open.
  presenting: false,
  presentAt: -10,
  presentEndAt: -10,
  presentTarget: { x: 0, y: 0, has: false }, // viewport px (panel center)
  reactAt: -10, // a card changed in the modal

  // Stage geometry, written by the stage. rect is the stage's viewport rect.
  stage: { w: 0, h: 0, layout: 'column', rect: { left: 0, top: 0 } },

  // Robot screen position (stage-local px), written by the frame loop.
  screen: { x: 0, y: 0, faceX: 0, faceY: 0, size: 0, ready: false },

  // DOM nodes the frame loop moves directly.
  dom: { button: null, bubble: null },

  invalidate: null,
  quietFocus: false, // set while the hologram hands focus back to the robot
}
