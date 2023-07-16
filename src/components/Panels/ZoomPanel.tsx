import ReactSlider from "react-slider";
import { PanelsProps } from "./types";
const ZoomPanel = (props: Pick<PanelsProps, "setZoom" | "zoom">) => {
  const { setZoom, zoom } = props;
  return (
    <div>
      <h2 className="mb-1">Zoom</h2>
      <ReactSlider
        className="pt-5 pb-10"
        thumbClassName="flex flex-col items-center outline-none"
        trackClassName="h-1 bg-slate-900"
        value={zoom}
        onChange={(value) => {
          setZoom(value);
        }}
        max={1.5}
        min={0.5}
        step={0.01}
        renderThumb={(props, state) => {
          return (
            <div {...props}>
              <button className="border border-gray-200 bg-white transform -translate-y-1/2 w-6 h-6 rounded-full shadow-none active:bg-blue-300 active:shadow-md" />
              <div className="text-xs">
                {(state.valueNow * 100).toFixed(0)}%
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
export default ZoomPanel;
