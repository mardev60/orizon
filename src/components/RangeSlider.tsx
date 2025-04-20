import React, { useState } from 'react';
import FormField from './FormField';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

interface SliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  required?: boolean;
}

const SliderInput: React.FC<SliderProps> = ({
  id,
  label,
  value,
  onChange,
  min = 0,
  max = 500,
  step = 10,
  error,
  required = false,
}) => {
  const [rangeValue, setRangeValue] = useState([0, value]);

  const handleRangeChange = (values: number[]) => {
    setRangeValue([0, values[1]]);
    onChange(values[1]);
  };

  return (
    <FormField label={label} error={error} required={required}>
      <div className="mb-2">
        <div className="pb-6 pt-2">
          <RangeSlider
            id={id}
            min={min}
            max={max}
            step={step}
            value={rangeValue}
            onInput={handleRangeChange}
            className="single-thumb custom-range-slider"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-ice-blue">€{min}</span>
          <div className="w-12 h-8 flex items-center justify-center bg-neon-blue/20 rounded border border-neon-blue/40">
            <span className="text-white font-medium">€{value}</span>
          </div>
          <span className="text-xs text-ice-blue">€{max}</span>
        </div>
      </div>
    </FormField>
  );
};

export default SliderInput;