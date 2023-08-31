const PieChartLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  fill,
  value,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy}L${mx},${my}L${mx},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={mx} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 5}
        y={ey}
        textAnchor={textAnchor}
        className="text-sm font-title"
        fill={fill}
      >
        {value}
        {percent ? "%" : ""}
      </text>
    </g>
  );
};

export default PieChartLabel;
