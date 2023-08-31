import { ReactComponent as Loading } from "../../../assets/svg/icons/loading-button.svg";

const SubmitButton = ({
  type = "submit",
  disabled,
  loading,
  children,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-violet-400 font-title text-xs font-semibold text-neutral-50 h-14 px-10 rounded-md transition-all hover:bg-violet-500 cursor-pointer uppercase disabled:cursor-default disabled:bg-violet-300 disabled:hover:bg-violet-300 ${className}`}
    >
      {loading ? (
        <Loading className="fill-violet-50 animate-rotate m-auto" />
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
