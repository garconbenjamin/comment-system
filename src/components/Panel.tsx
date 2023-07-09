const Panel = ({
  setPosition,
  position,
  zoom,
}: {
  setPosition: React.Dispatch<{ x: number; y: number }>;
  position: { x: number; y: number };
  zoom: number;
}) => (
  <div>
    <button
      onClick={() => setPosition({ ...position, y: position.y + 1 * zoom })}
    >
      up
    </button>
    <button
      onClick={() => setPosition({ ...position, x: position.x - 1 * zoom })}
    >
      left
    </button>
  </div>
);
export default Panel;
