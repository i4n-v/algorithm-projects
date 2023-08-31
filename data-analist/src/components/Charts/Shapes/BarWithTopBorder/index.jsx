const BarWithTopBorder = ({
  layout = "horizontal",
  color,
  borderSize,
  fill,
  x,
  y,
  width,
  height,
}) => {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="none"
        fill={fill}
      />
      <rect
        x={layout === "horizontal" ? x : x + width}
        y={y}
        width={layout === "horizontal" ? width : borderSize}
        height={layout === "horizontal" ? borderSize : height}
        stroke="none"
        fill={color}
      />
    </g>
  );
};

export default BarWithTopBorder;
