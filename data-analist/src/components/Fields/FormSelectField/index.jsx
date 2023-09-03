import CustomArray from "../../../entities/CustomArray";

const FormSelectField = ({
  name,
  label,
  required,
  disabled,
  options = new CustomArray(),
  defaultValue,
  register,
  customHandleChange,
  error,
  className,
}) => {
  const activeError = !!error[name];
  const { onChange, ...settings } = register(name);

  return (
    <div className={`h-12 relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-xs ${activeError ? "text-red-400" : " text-violet-400"
            } absolute -top-2.5 left-3 px-1`}
        >
          <span className="relative z-10">
            {required && <span className="text-red-400 mr-1">*</span>}
            {label}
          </span>
          <span className="absolute top-2.5 left-0 w-full h-1 bg-neutral-50"></span>
        </label>
      )}
      <select
        id={name}
        disabled={disabled}
        {...settings}
        defaultValue={defaultValue ? JSON.stringify(defaultValue) : null}
        onChange={(event) => {
          onChange(event);
          if (customHandleChange) customHandleChange();
        }}
        className={`w-full h-full bg-neutral-50 rounded-md outline-none disabled:cursor-default disabled:hover:border border text-center ${activeError ? "border-red-400" : "border-violet-400"
          } hover:border-2 focus:border-2 text-sm text-neutral-700 placeholder:text-neutral-400 px-2`}
      >
        {!!defaultValue && <option value={defaultValue}>{defaultValue}</option>}
        {options?.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>
            {option}
          </option>
        )).getStructure()}
      </select>
      {activeError && (
        <p className="text-xs text-red-300 max-w-full ml-3">
          {error[name].message}
        </p>
      )}
    </div>
  );
};

export default FormSelectField;
