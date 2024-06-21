import React from "react";
import Button from "../Button";
import { NumberFormatBase } from "react-number-format";

const CustomInputNumber = () => {
  return (
    <div className="mt-2 flex gap-2">
      <Button icon={"-"} disabled />
      <NumberFormatBase
        size={4}
        className="text-center border rounded"
        value={1}
      />
      <Button icon={"+"} />
    </div>
  );
};

export default CustomInputNumber;
