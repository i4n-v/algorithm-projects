import { useState } from "react";
import { ReactComponent as Eye } from "../../../assets/svg/icons/eye.svg";
import { ReactComponent as CloseEye } from "../../../assets/svg/icons/close-eye.svg";
import { ReactComponent as Lock } from "../../../assets/svg/icons/lock.svg";
import { ReactComponent as User } from "../../../assets/svg/icons/user.svg";

const FormField = ({
  name,
  type,
  label,
  required,
  disabled,
  placeholder,
  register,
  error,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const activeError = !!error[name];

  const togleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className={`h-12 relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-xs ${
            activeError ? "text-error-400" : " text-violet-400"
          } absolute -top-2.5 left-3 px-1`}
        >
          <span className="relative z-10">
            {required && <span className="text-error-400 mr-1">*</span>}
            {label}
          </span>
          <span className="absolute top-2.5 left-0 w-full h-1 bg-neutral-50"></span>
        </label>
      )}
      <input
        id={name}
        type={showPassword ? "text" : type}
        disabled={disabled}
        autoComplete="off"
        {...register(name)}
        placeholder={placeholder}
        className={`w-full h-full bg-neutral-50 rounded-md outline-none disabled:cursor-default disabled:hover:border border ${
          activeError ? "border-error-400" : "border-violet-400"
        } hover:border-2 focus:border-2 text-sm text-neutral-700 placeholder:text-neutral-400 ${
          type === "login" ? "pl-8 pr-2" : type === "password" ? "px-8" : "px-2"
        }`}
      />
      {activeError && (
        <p className="text-xs text-error-300 max-w-full ml-3">
          {error[name].message}
        </p>
      )}
      {type === "login" && (
        <User className="fill-violet-400 absolute top-3.5 left-2 w-5 h-5" />
      )}
      {type === "password" && (
        <>
          <Lock className="fill-violet-400 absolute top-3.5 left-2 w-5 h-5" />
          {showPassword ? (
            <CloseEye
              className="fill-violet-400 absolute top-2.5 right-2 cursor-pointer w-8 h-8 transition ease-in-out delay-75 rounded-full active:bg-violet-50 p-1"
              onClick={togleShowPassword}
            />
          ) : (
            <Eye
              className="fill-violet-400 absolute top-2.5 right-2 cursor-pointer w-8 h-8 transition ease-in-out delay-75 rounded-full active:bg-violet-50 p-1"
              onClick={togleShowPassword}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FormField;
