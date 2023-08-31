import { CountUp } from "../../../Animations/";

const PercentLabel = ({
  value,
  percent = false,
  animation = true,
  className = "",
}) => {
  return (
    <>
      <CountUp
        data={value}
        element="text"
        animation={animation}
        x={percent ? "42%" : "50%"}
        y={"50%"}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`neutral-700 font-title fill-current font-semibold flex justify-center items-center ${className}`}
      />
      <text
        x={"72%"}
        y={"50%"}
        textAnchor="middle"
        dominantBaseline="middle"
        className={`neutral-700 font-title fill-current font-semibold flex justify-center items-center ${className}`}
      >
        {percent ? "%" : ""}
      </text>
    </>
  );
};

export default PercentLabel;
