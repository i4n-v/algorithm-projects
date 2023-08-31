import { useMemo } from "react";
import {
  RadialBarChart as RadialChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";
import useUtils from "../../../utils/useUtils";

const RadialBarChart = ({
  data,
  radials,
  gradients,
  innerRadius = "85%",
  outerRadius = "110%",
  legend,
  className,
  radius = "100%",
  barSize = 5,
  margin = {},
  animation = true,
  polarX,
  label,
  insideLabel,
  limit,
}) => {
  const { numberToRem } = useUtils();

  const radialsComponent = useMemo(
    () =>
      radials?.map((radialBar) => {
        return (
          <RadialBar
            key={radialBar.key}
            dataKey={radialBar.key}
            fill={
              radialBar.gradient
                ? `url(#${radialBar.gradient})`
                : radialBar.color || "#404040"
            }
            cornerRadius={radius}
            barSize={numberToRem(barSize)}
            isAnimationActive={animation}
            angleAxisId={radialBar?.angleId || 0}
            label={insideLabel}
            background={{
              fill: radialBar.background || "#f5f5f5",
            }}
          >
            {label && (
              <LabelList dataKey={label.key} fontFamily="Rubik" {...label} />
            )}
          </RadialBar>
        );
      }),
    [radials, barSize, animation, label, insideLabel, radius, numberToRem]
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
              y1={gradient.y1 || "0"}
              y2={gradient.y2 || "0.5"}
            >
              <stop
                offset="5%"
                stopColor={gradient.to || "#a3a3a3"}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={gradient.from || "#404040"}
                stopOpacity={0.7}
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
        <RadialChart
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={0}
          margin={margin}
        >
          {gradientsComponent}
          {radialsComponent}
          {!!polarX && (
            <PolarAngleAxis
              {...polarX}
              angleAxisId={polarX?.angleId || 0}
              tick={false}
              domain={[0, limit || polarX?.dataKey]}
              type="number"
            />
          )}
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
        </RadialChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialBarChart;
