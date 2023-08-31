import { useMemo } from "react";
import {
  PieChart as ChartPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Label,
  LabelList,
} from "recharts";
import useUtils from "../../../utils/useUtils";

const PieChart = ({
  data,
  cells,
  dataKey,
  gradients,
  paddingAngle = 0.1,
  innerRadius = "75%",
  outerRadius = "100%",
  legend,
  className,
  margin = {},
  animation = true,
  label,
  pieLabel,
}) => {
  const { numberToRem } = useUtils();

  const cellsComponent = useMemo(
    () =>
      cells?.map((cell) => {
        return (
          <Cell
            key={cell.key}
            stroke={cell.stroke}
            fill={
              cell.gradient ? `url(#${cell.gradient})` : cell.color || "#44403c"
            }
          />
        );
      }),
    [cells]
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
                stopColor={gradient.to || "#a8a29e"}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={gradient.from || "#44403c"}
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
        <ChartPie width="100%" height="100%">
          {gradientsComponent}
          <Pie
            data={data}
            dataKey={dataKey}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            margin={margin}
            labelLine={pieLabel?.labelLine || false}
            isAnimationActive={animation}
            paddingAngle={numberToRem(paddingAngle)}
          >
            {cellsComponent}
            {label && <Label fontFamily="Rubik" {...label} />}
            {pieLabel && (
              <LabelList
                dataKey={dataKey}
                fontFamily="Rubik"
                position="top"
                fontSize="0.75rem"
                fill="#44403c"
                {...pieLabel}
              />
            )}
          </Pie>
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
        </ChartPie>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
