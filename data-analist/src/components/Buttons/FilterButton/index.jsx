import { ReactComponent as Loading } from "../../../assets/svg/icons/loading-button.svg";
import { ReactComponent as Filters } from "../../../assets/svg/icons/filters.svg";

const FilterButton = ({
  type = "button",
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
      className={`font-title text-xs font-semibold text-neutral-50 flex items-center gap-2 rounded-md transition-all cursor-pointer uppercase disabled:cursor-default disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <Loading className="fill-violet-50 animate-rotate m-auto" />
      ) : (
        <>
          <Filters className="fill-violet-400 w-6 h-6" />
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  );
};

export default FilterButton;
