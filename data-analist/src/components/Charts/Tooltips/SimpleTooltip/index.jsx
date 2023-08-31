import { memo } from "react";
import Box from "../../../Box";

const SimpleTooltip = ({
  payload,
  active,
  labelFormatter,
  valueFormatter,
  nameFormatter,
  className,
  ...props
}) => {
  if (active && payload && payload.length) {
    return (
      <Box className={`bg-neutral-50 min-h-20 min-w-40 p-2 ${className}`}>
        <p className="font-title neutral-900 text-size-body">
          {labelFormatter
            ? labelFormatter(props.label, payload, props)
            : props.label}
        </p>
        {payload.map(({ name, value }) => {
          return (
            <p key={`${name}-${value}`} className="text-sm neutral-700">
              <span className="font-title">
                {nameFormatter ? nameFormatter(name, payload, props) : name}:{" "}
              </span>
              {valueFormatter ? valueFormatter(value, payload, props) : value}
            </p>
          );
        })}
      </Box>
    );
  }
};

export default memo(SimpleTooltip);
