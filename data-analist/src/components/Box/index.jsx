import { forwardRef } from "react";

const Box = forwardRef(({ children, className = "" }, ref) => {
  return (
    <div ref={ref} className={`rounded-md bg-neutral-600/20 p-1 ${className}`}>
      {children}
    </div>
  );
});

Box.displayName = "Box";
export default Box;
