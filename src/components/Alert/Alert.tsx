import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import classNames from "classnames";
import React from "react";

interface AlertProps {
  children?: React.ReactNode;
  severity?: "error" | "warning" | "info" | "success";
}

const Alert = ({ children, severity = "info" }: AlertProps) => {
  const severityBgClasses = {
    error: "bg-red-50",
    warning: "bg-yellow-50",
    info: "bg-blue-50",
    success: "bg-green-50",
  };

  const severityTextClasses = {
    error: "text-red-800",
    warning: "text-yellow-800",
    info: "text-blue-800",
    success: "text-green-800",
  };

  const renderIcon = () => {
    switch (severity) {
      case "error":
        return (
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        );
      case "warning":
        return (
          <ExclamationCircleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        );
      case "info":
        return (
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        );
      case "success":
        return (
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        );
    }
  };

  return (
    <div className={classNames("rounded-md p-4", severityBgClasses[severity])}>
      <div className="flex">
        <div className="flex-shrink-0">{renderIcon()}</div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className={classNames("text-sm", severityTextClasses[severity])}>
            {children || "This is an alert message"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
