import { useMemo } from "react";
import {
  BarChart as ChartBar,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  LabelList,
  CartesianGrid,
  Tooltip,
} from "recharts";
import useUtils from "../../../utils/useUtils";

const BarChart = ({
  data,
  bars,
  gradients,
  legend,
  tooltip = {},
  className,
  layout = "horizontal",
  radius = [3, 3, 0, 0],
  barSize = 4,
  margin = {},
  animation = true,
  cartesiangrid,
  x,
  y,
  label,
  limit,
  shape,
  background,
}) => {
  const { numberToRem } = useUtils();

  const barsComponent = useMemo(
    () =>
      bars?.map((bar, index) => {
        return (
          <Bar
            key={bar.key}
            shape={shape || false}
            dataKey={bar.key}
            fill={
              bar.gradient ? `url(#${bar.gradient})` : bar.color || "#44403c"
            }
            radius={radius}
            stackId={bar.stackId || "stack-" + index}
            maxBarSize={numberToRem(barSize)}
            isAnimationActive={animation}
            background={background}
          >
            {label && (
              <LabelList
                dataKey={bar.key}
                fontFamily="Rubik"
                fontSize="0.75rem"
                fill="#44403c"
                {...label}
              />
            )}
          </Bar>
        );
      }),
    [bars, barSize, animation, label, radius, shape, background, numberToRem]
  );

  const gradientsComponent = useMemo(
    () =>
      gradients?.map((gradient, index) => {
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
                stopColor={gradient.from || "#a8a29e"}
                stopOpacity={0.9}
              />
              <stop
                offset="95%"
                stopColor={gradient.to || "#44403c"}
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>
        );
      }),
    [gradients]
  );

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartBar data={data} layout={layout} margin={margin}>
          {cartesiangrid && (
            <CartesianGrid {...cartesiangrid} stroke="#a3a3a3" />
          )}
          <Tooltip {...tooltip} />
          {gradientsComponent}
          {barsComponent}
          <XAxis
            fontSize="0.75rem"
            tick={{ fill: "#44403c" }}
            {...x}
            domain={[0, limit || x?.dataKey]}
          />
          <YAxis
            fontSize="0.75rem"
            tick={{ fill: "#44403c" }}
            {...y}
            domain={[0, limit || y?.dataKey]}
          />
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
        </ChartBar>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
