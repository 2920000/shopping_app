import React, { forwardRef } from "react";

const classes = {
  base: "focus:outline-none",
  disabled: "opacity-50 cursor-not-allowed",
  pill: "rounded-full",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2",
    large: "px-8 py-3 text-xl",
  },
  variant: {
    primary: "bg-black text-white",
    secondary:"bg-white text-black",
    third:'bg-white border ',
  },
};
const Button = forwardRef(
  (
    {
      children,
      type = "button",
      className,
      pill,
      variant = "primary",
      size = "normal",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        type={type}
        className={` ${classes.base}
      ${classes.size[size]}
      ${classes.variant[variant]}
      ${pill && classes.pill}
      ${disabled && classes.disabled}
      ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Button.propTypes={
//     children:Prop
// }
export default Button;
