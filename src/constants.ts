const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.0001;
const INITIAL_UUID = "00000000-0000-0000-0000-000000000000";
const INITIAL_IMAGE = "/cover.jpg";
const MARKPOINT_SIZE = 30;
const COLORS: Record<string, string> = {
  red: "🔴",
  orange: "🟠",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
  purple: "🟣",
  black: "⚫️",
  white: "⚪️",
};

export {
  COLORS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  INITIAL_ZOOM,
  ZOOM_SPEED,
  INITIAL_UUID,
  INITIAL_IMAGE,
  MARKPOINT_SIZE,
};
