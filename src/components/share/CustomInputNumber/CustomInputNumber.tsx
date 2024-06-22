import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../Button";
import { NumberFormatBase } from "react-number-format";
import classNames from "classnames";

interface CustomInputNumberProps {
  value?: number;
  step?: number;
  min: number;
  max: number;
  disabled: boolean;
  name: string;
  onChange?: (event: { target: { name: string; value: number } }) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
}

const CustomInputNumber = (props: CustomInputNumberProps) => {
  const {
    value = 1,
    step = 1,
    max,
    min,
    disabled,
    name,
    onChange,
    onBlur,
    onInput,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<number>(value);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    triggerInputEventChange();
    onChange && onChange({ target: { name, value: inputValue } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const triggerInputEventChange = () => {
    if (inputRef.current) {
      const event = new Event("input", { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
  };

  const handleStepChange = (operation: "increment" | "decrement") => {
    if (disabled) return;

    setInputValue((prevValue) => {
      if (operation === "increment") {
        return Math.min(prevValue + step, max);
      } else {
        return Math.max(prevValue - step, min);
      }
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value);

    if (disabled) return;
    console.log("!!");
    if (isNaN(newValue)) {
      newValue = min;
    }
    setInputValue(newValue);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value);
    if (disabled) return;
    if (isNaN(newValue)) {
      newValue = min;
    }
    const clampedValue = Math.min(Math.max(newValue, min), max);

    setInputValue(clampedValue);
    onBlur && onBlur(event);
  };

  const handleMouseDown = (operation: "increment" | "decrement") => {
    if (disabled) return;
    handleStepChange(operation);
    intervalRef.current = setInterval(() => {
      handleStepChange(operation);
    }, 100);
  };

  const handleMouseUpOrLeave = () => {
    if (disabled) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="mt-2 flex gap-2">
      <Button
        type="button"
        icon={"-"}
        className="w-12 h-12"
        disabled={disabled || inputValue <= min}
        onMouseDown={() => handleMouseDown("decrement")}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      />
      <NumberFormatBase
        getInputRef={inputRef}
        className={classNames("text-center border rounded w-12 h-12", {
          "cursor-not-allowed bg-gray-100 text-gray-500 ring-gray-200":
            disabled,
        })}
        disabled={disabled}
        value={inputValue}
        placeholder={min.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        onInput={onInput}
      />
      <Button
        type="button"
        icon={"+"}
        className="w-12 h-12"
        disabled={disabled || inputValue >= max}
        onMouseDown={() => handleMouseDown("increment")}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      />
    </div>
  );
};

export default CustomInputNumber;
