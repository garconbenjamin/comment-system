import { Graphics, PixiComponent } from "@pixi/react";

// const MarkPoint = (props: {
//   x: number;
//   y: number;
//   color?: string;
//   zIndex: number;
// }) => {
//   const { x, y, color = "0xffff0b", zIndex } = props;

//   return (
//     <Graphics
//       zIndex={zIndex}
//       draw={(g) => {
//         g.clear();
//         g.beginFill(color);
//         g.drawCircle(x, y, 10);
//         g.endFill();
//       }}
//       click={(e) => console.log(e)}
//     />
//   );
// };

const MarkPoint = PixiComponent("MarkPoint", {
  create: (props: { x: number; y: number; color?: string; zIndex: number }) => {
    // instantiate something and return it.
    // for instance:
    return new Graphics({ x: props.x, y: props.y });
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    // props changed
    // apply logic to the instance
  },
  config: {
    // destroy instance on unmount?
    // default true
    destroy: true,

    /// destroy its children on unmount?
    // default true
    destroyChildren: true,
  },
});

export default MarkPoint;
