import { useRef } from "react";
import Box from "../Box";
import { ReactComponent as Close } from "../../assets/svg/icons/close.svg";

const Modal = ({ display, title, className, fullWidth, children, onClose }) => {
  const modal = useRef(null);

  if (!display) return null;

  return (
    <div
      ref={modal}
      className="absolute top-0 left-0 flex items-center px-6 bg-neutral-900/40 w-full h-full position-fixed z-50 shadow-md"
      onClick={({ target }) => {
        if (target === modal.current) {
          onClose();
        }
      }}
    >
      <Box
        className={`w-full mx-auto bg-neutral-50 p-4 animate-down ${
          fullWidth ? "max-w-none" : "max-w-4xl"
        } ${className}`}
      >
        <div className="col-span-full flex justify-between w-full border-b border-neutral-400 mb-4">
          {title && (
            <p className="text-size-h6 text-neutral-50 font-title">{title}</p>
          )}
          <Close
            onClick={onClose}
            className="cursor-pointer fill-violet-400 w-3"
          />
        </div>
        {children}
      </Box>
    </div>
  );
};

export default Modal;
