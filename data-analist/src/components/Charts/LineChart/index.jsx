import { useMemo } from "react";
import {
  LineChart as ChartLine,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  LabelList,
  CartesianGrid,
  Tooltip,
} from "recharts";
import useUtils from "../../../hooks/useUtils";
import CustomArray from "../../../entities/CustomArray";

const LineChart = ({
  data = new CustomArray(),
  lines,
  gradients,
  legend,
  tooltip,
  className,
  layout = "horizontal",
  radius = 0,
  lineSize = 0.2,
  margin = {},
  animation = true,
  cartesiangrid,
  x,
  y,
  label,
  limit,
}) => {
  const { numberToRem } = useUtils();

  const linesComponent = useMemo(
    () =>
      lines
        ?.map((line) => {
          return (
            <Line
              key={line.key}
              dataKey={line.key}
              type={line?.type || "monotone"}
              strokeWidth={numberToRem(lineSize)}
              dot={line.dote || true}
              connectNulls={true}
              stroke={
                line.gradient
                  ? `url(#${line.gradient})`
                  : line.color || "#44403c"
              }
              radius={radius}
              isAnimationActive={animation}
            >
              {label && (
                <LabelList
                  dataKey={line.key}
                  fontFamily="Rubik"
                  fontSize="0.75rem"
                  {...label}
                />
              )}
            </Line>
          );
        })
        .getStructure(),
    [lines, lineSize, animation, label, radius, numberToRem]
  );

  const gradientsComponent = useMemo(
    () =>
      gradients
        ?.map((gradient, index) => {
          return (
            <defs key={gradient.id}>
              <linearGradient
                id={gradient.id || index}
                x1={gradient.x1 || "0"}
                x2={gradient.x2 || "0"}
                y1={gradient.y1 || "1"}
                y2={gradient.y2 || "0"}
              >
                <stop
                  offset="5%"
                  stopColor={gradient.to || "#a8a29e"}
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor={gradient.from || "#44403c"}
                  stopOpacity={0.7}
                />
              </linearGradient>
            </defs>
          );
        })
        .getStructure(),
    [gradients]
  );

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartLine data={data.getStructure()} layout={layout} margin={margin}>
          {cartesiangrid && (
            <CartesianGrid {...cartesiangrid} stroke="#a3a3a3" />
          )}
          {gradientsComponent}
          {linesComponent}
          <XAxis
            {...x}
            fontSize="0.75rem"
            tick={{ fill: "#fafafa" }}
            domain={[0, limit || x?.dataKey]}
          />
          <YAxis
            {...y}
            fontSize="0.75rem"
            tick={{ fill: "#fafafa" }}
            domain={[0, limit || y?.dataKey]}
          />
          <Tooltip {...tooltip} />
          {!!legend && (
            <Legend
              layout={legend.layout || "horizontal"}
              payload={legend.titles?.map((title) => ({
                type: title.icon || "square",
                value: (
                  <span className="font-body text-violet-400 ml-1 text-center">
                    {title.title}
                  </span>
                ),
                color: title.color || "#44403c",
              }))}
              verticalAlign={legend.verticalAlign || "top"}
              iconSize={legend.iconSize || "0.5rem"}
              align={legend.align || "right"}
              wrapperStyle={legend.position || {}}
            />
          )}
        </ChartLine>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
