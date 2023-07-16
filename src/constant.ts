import image1 from "images/1.jpg";
import image2 from "images/2.jpg";
import image3 from "images/3.jpg";
import image4 from "images/4.jpg";
import image5 from "images/5.jpg";
import cover from "images/cover.jpg";
const INITIAL_POSITION = { x: 0, y: 0 };
const INITIAL_ZOOM = 1;
const ZOOM_SPEED = 0.0001;

const INITIAL_IMAGES = [
  {
    src: cover,
    x: 194,
    y: 236,
    id: "7ca19e40-b241-4773-bac8-0c391b40ea8d",
  },
  {
    src: image1,
    x: 486,
    y: 9,
    id: "aac4480e-a215-44c5-9f94-b2341c758cf2",
  },
  {
    src: image2,
    x: 220,
    y: -3,
    id: "45ab6840-2f6f-46a2-a699-bad99e50f55e",
  },
  {
    src: image3,
    x: 22,
    y: 303,
    id: "4117fc3f-6722-433b-8667-883cc51f4661",
  },
  {
    src: image4,
    x: 454,
    y: 567,
    id: "168e48ca-2648-4fc1-9289-b68162669623",
  },
  {
    src: image5,
    x: 756,
    y: 1,
    id: "6befe8be-9a35-4f8d-9d36-82d20c875446",
  },
];

const INITIAL_DIALOGS = [
  {
    id: "965a53b6-aea3-4670-a5de-0d77325a8416",
    x: 476,
    y: 270,
    comments: [
      {
        content: "🐰New Jeans🐰",
        username: "BUNNIES",
        timestamp: "Mon Jul 17 2023 02:43:02 GMT+0800",
        id: "896a8d6d-7d12-4517-83d0-6a5168965a8d",
      },
    ],
    color: "white",
    imageId: "7ca19e40-b241-4773-bac8-0c391b40ea8d",
  },
  {
    id: "6f1a34d1-bdaa-4dd7-8b1e-a21d5caa0390",
    x: 26,
    y: 49,
    comments: [
      {
        content: "Hello, I'm Hanni!🤍",
        username: "BUNNIES",
        timestamp: "Mon Jul 17 2023 02:44:37 GMT+0800",
        id: "03d5c7a4-2cbb-41ad-8e04-d066e9c7bfd5",
      },
    ],
    color: "orange",
    imageId: "168e48ca-2648-4fc1-9289-b68162669623",
  },
  {
    id: "5ad4ac08-15fb-4cc5-a18b-bd4a8731037f",
    x: 61,
    y: 209,
    comments: [
      {
        content: "I'm Danielle from Australia.🤍",
        username: "BUNNIES",
        timestamp: "Mon Jul 17 2023 02:45:21 GMT+0800",
        id: "04be469e-06d9-4370-adce-33eba51deb76",
      },
    ],
    color: "orange",
    imageId: "45ab6840-2f6f-46a2-a699-bad99e50f55e",
  },
  {
    id: "8457ba6e-4ecc-4f97-bbb2-635640a8ffcb",
    x: 816,
    y: 457,
    color: "green",
    comments: [
      {
        content: "Outside of image",
        username: "BUNNIES",
        timestamp: "Mon Jul 17 2023 02:46:23 GMT+0800",
        id: "0731422b-45b8-4e17-aa84-ecf4e8469b54",
      },
    ],
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
  INITIAL_IMAGES,
  INITIAL_DIALOGS,
  INITIAL_USER,
  INITIAL_ZOOM,
  MARKPOINT_SIZE,
  ZOOM_SPEED,
  COLORS,
  INITIAL_POSITION,
};
