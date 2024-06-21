import classNames from "classnames";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      icon,
      disabled = false,
      size = "md",
      className,
      ...rest
    } = props;

    const getBtnSize = (size: string) => {
      switch (size) {
        case "sm":
          return "px-2 py-1 text-sm";
        case "md":
          return "px-4 py-2 text-base";
        case "lg":
          return "px-6 py-3 text-lg";
        default:
          return "px-4 py-2 text-base";
      }
    };

    const classes = classNames(
      "rounded shadow-sm",
      {
        "text-gray-900 bg-white hover:bg-indigo-100 border": !disabled,
        "text-gray-700 bg-gray-200 cursor-not-allowed": disabled,
      },
      getBtnSize(size),
      className
    );

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const { onClick } = props;
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const renderChildren = () => {
      if (icon && !children) {
        return <>{icon}</>;
      }

      if (icon && children) {
        return (
          <span className="flex items-center justify-center">
            <span className="text-lg">{icon}</span>
            <span className="ltr:ml-1 rtl:mr-1">{children}</span>
          </span>
        );
      }

      return children;
    };

    return (
      <button ref={ref} className={classes} {...rest} onClick={handleClick}>
        {renderChildren()}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
