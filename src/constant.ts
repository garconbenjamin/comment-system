import image1 from "images/1.jpg";
import image2 from "images/2.jpg";
import image3 from "images/3.jpg";
import image4 from "images/4.jpg";
import image5 from "images/5.jpg";
import cover from "images/cover.jpg";
const ARTBOARD_WIDTH = 800;
const ARTBOARD_HEIGHT = 1000;
const INITIAL_POSITION = {
  x: (window.innerWidth - ARTBOARD_WIDTH) / 2,
  y: (window.innerHeight - ARTBOARD_HEIGHT) / 2,
};
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.0001;

const INITIAL_IMAGES = [
  {
    src: cover,
    x: 0,
    y: 0,
    id: "7ca19e40-b241-4773-bac8-0c391b40ea8d",
  },
  {
    src: image1,
    x: 200,
    y: 200,
    id: "aac4480e-a215-44c5-9f94-b2341c758cf2",
  },
  // {
  //   src: image2,
  //   x: 158.27458372398095,
  //   y: 76.95600793636588,
  //   id: "45ab6840-2f6f-46a2-a699-bad99e50f55e",
  // },
  // {
  //   src: image3,
  //   x: -33.60877960046382,
  //   y: 95.35530656235665,
  //   id: "4117fc3f-6722-433b-8667-883cc51f4661",
  // },
  // {
  //   src: image4,
  //   x: 613.9576962978691,
  //   y: 716.2256514167487,
  //   id: "168e48ca-2648-4fc1-9289-b68162669623",
  // },
  // {
  //   src: image5,
  //   x: 628.8121752748266,
  //   y: 24.64079779200256,
  //   id: "6befe8be-9a35-4f8d-9d36-82d20c875446",
  // },
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
  INITIAL_POSITION,
};
