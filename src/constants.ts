const ARTBOARD_WIDTH = 800;
const ARTBOARD_HEIGHT = 1000;
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.0001;

const INITIAL_IMAGES = [
  {
    src: "/cover.jpg",
    x: 104.46303490029275,
    y: 361.68288131619244,
    id: "7ca19e40-b241-4773-bac8-0c391b40ea8d",
  },
  {
    src: "/1.jpg",
    x: 389.5436325696334,
    y: 86.12358457665145,
    id: "aac4480e-a215-44c5-9f94-b2341c758cf2",
  },
  {
    src: "/2.jpg",
    x: 158.27458372398095,
    y: 76.95600793636588,
    id: "45ab6840-2f6f-46a2-a699-bad99e50f55e",
  },
  {
    src: "/3.jpg",
    x: -33.60877960046382,
    y: 95.35530656235665,
    id: "4117fc3f-6722-433b-8667-883cc51f4661",
  },
  {
    src: "/4.jpg",
    x: 613.9576962978691,
    y: 716.2256514167487,
    id: "168e48ca-2648-4fc1-9289-b68162669623",
  },
  {
    src: "/5.jpg",
    x: 628.8121752748266,
    y: 24.64079779200256,
    id: "6befe8be-9a35-4f8d-9d36-82d20c875446",
  },
];

const INITIAL_USER = "BUNNIES";
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
  INITIAL_USER,
  ARTBOARD_WIDTH,
  ARTBOARD_HEIGHT,
  INITIAL_ZOOM,
  ZOOM_SPEED,
  INITIAL_IMAGES,
  MARKPOINT_SIZE,
};
