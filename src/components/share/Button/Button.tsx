import classNames from "classnames";
import React, { MouseEventHandler } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "default";
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
      variant,
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

    const btnColor = () => {
      switch (variant) {
        case "primary":
          return "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
        case "default":
          return "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
        default:
          return "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
      }
    };

    const classes = classNames(
      "rounded shadow-sm",
      getBtnSize(size),
      btnColor(),
      className,
      {
        "text-gray-700 bg-gray-200 opacity-50 cursor-not-allowed": disabled,
      }
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

    const handleMouseDown = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const { onMouseDown } = props;
      if (disabled) {
        e.preventDefault();
        return;
      }
      onMouseDown?.(e);
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
      <button
        ref={ref}
        className={classes}
        {...rest}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {renderChildren()}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
