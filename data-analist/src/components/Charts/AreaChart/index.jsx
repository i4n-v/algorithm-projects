import { useMemo } from "react";
import {
  AreaChart as ChartArea,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  LabelList,
  CartesianGrid,
  Tooltip,
} from "recharts";
import useUtils from "../../../utils/useUtils";

const LineChart = ({
  data,
  areas,
  gradients,
  legend,
  tooltip = {},
  className,
  layout = "horizontal",
  radius = 0,
  areaSize = 0.2,
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
                : line.color || "#44403c"
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
              <LabelList
                dataKey={line.key}
                fontFamily="Rubik"
                position="top"
                fontSize="0.75rem"
                fill="#44403c"
                {...label}
              />
            )}
          </Area>
        );
      }),
    [areas, areaSize, animation, label, radius, numberToRem]
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
        <ChartArea data={data} layout={layout} margin={margin}>
          {cartesiangrid && (
            <CartesianGrid {...cartesiangrid} stroke="#a3a3a3" />
          )}
          {gradientsComponent}
          {areasComponent}
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
          <Tooltip {...tooltip} />
          {!!legend && (
            <Legend
              layout={legend.layout || "horizontal"}
              payload={legend.titles?.map((title) => ({
                type: title.icon || "circle",
                color: title.color || "#44403c",
                value: (
                  <span className="font-body neutral-700 ml-1 text-center">
                    {title.title}
                  </span>
                ),
              }))}
              verticalAlign={legend.verticalAlign || "top"}
              iconSize={legend.iconSize || "0.5rem"}
              align={legend.align || "right"}
              wrapperStyle={legend.position || {}}
            />
          )}
        </ChartArea>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
