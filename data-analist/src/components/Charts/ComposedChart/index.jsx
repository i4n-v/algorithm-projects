import { useMemo } from "react";
import {
  ComposedChart as ChartComposed,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import useUtils from "../../../hooks/useUtils";
import CustomArray from "../../../entities/CustomArray";

const ComposedChart = ({
  data = new CustomArray(),
  areas,
  areaSize = 0.2,
  bars,
  shape,
  barSize = 6,
  lines,
  lineSize = 0.2,
  gradients,
  legend,
  className,
  layout = "horizontal",
  radius = 0,
  margin = {},
  animation = true,
  cartesiangrid,
  x,
  y,
  label,
  limit,
}) => {
  const { numberToRem } = useUtils();

  const areasComponent = useMemo(
    () =>
      areas?.map((line) => {
        return (
          <Area
            key={line.key}
            dataKey={line.key}
            type={line?.type || "monotone"}
            strokeWidth={numberToRem(areaSize)}
            dot={line.dote || true}
            connectNulls={true}
            stroke={
              line.gradient
                ? `url(#line-${line.gradient})`
                : line.color || "#404040"
            }
            fill={
              line.gradient
                ? `url(#area-${line.gradient})`
                : line.color || "#d4d4d4"
            }
            radius={radius}
            isAnimationActive={animation}
          >
            {label && (
              <LabelList dataKey={line.key} fontFamily="Rubik" {...label} />
            )}
          </Area>
        );
      }),
    [areas, areaSize, animation, label, radius, numberToRem]
  );

  const linesComponent = useMemo(
    () =>
      lines?.map((line) => {
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
                ? `url(#line-${line.gradient})`
                : line.color || "#404040"
            }
            radius={radius}
            isAnimationActive={animation}
          >
            {label && (
              <LabelList dataKey={line.key} fontFamily="Rubik" {...label} />
            )}
          </Line>
        );
      }),
    [lines, lineSize, animation, label, radius, numberToRem]
  );

  const barsComponent = useMemo(
    () =>
      bars?.map((bar, index) => {
        return (
          <Bar
            key={bar.key}
            shape={shape || false}
            dataKey={bar.key}
            fill={
              bar.gradient
                ? `url(#area-${bar.gradient})`
                : bar.color || "#404040"
            }
            radius={radius}
            stackId={bar.stackId || "stack-" + index}
            maxBarSize={numberToRem(barSize)}
            isAnimationActive={animation}
          >
            {label && (
              <LabelList dataKey={bar.key} fontFamily="Rubik" {...label} />
            )}
          </Bar>
        );
      }),
    [bars, barSize, animation, label, radius, shape, numberToRem]
  );

  const gradientsComponent = useMemo(
    () =>
      gradients?.map((gradient, index) => {
        return (
          <defs key={gradient.id + "_" + index}>
            <linearGradient
              id={`area-${gradient.id || index}`}
              x1={gradient.x1 || "0"}
              x2={gradient.x2 || "0"}
              y1={gradient.y1 || "1"}
              y2={gradient.y2 || "0"}
            >
              <stop offset="5%" stopColor={gradient.from} stopOpacity={0.6} />
              <stop offset="95%" stopColor={gradient.to} stopOpacity={1} />
            </linearGradient>
            <linearGradient
              id={`line-${gradient.id || index}`}
              x1="1"
              x2="0"
              y1="0"
              y2="0"
            >
              <stop offset="5%" stopColor={gradient.to} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradient.from} stopOpacity={0.9} />
            </linearGradient>
          </defs>
        );
      }),
    [gradients]
  );

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComposed
          data={data.getStructure()}
          layout={layout}
          margin={margin}
        >
          <CartesianGrid {...cartesiangrid} />
          {gradientsComponent}
          {barsComponent}
          {areasComponent}
          {linesComponent}
          <XAxis {...x} domain={[0, limit || x?.dataKey]} />
          <YAxis {...y} domain={[0, limit || y?.dataKey]} />
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
                color: title.color || "#404040",
              }))}
              verticalAlign={legend.verticalAlign || "top"}
              iconSize={legend.iconSize || "0.5rem"}
              align={legend.align || "right"}
              wrapperStyle={legend.position || {}}
            />
          )}
        </ChartComposed>
      </ResponsiveContainer>
    </div>
  );
};

export default ComposedChart;
