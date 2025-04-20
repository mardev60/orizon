import React from 'react';
import FormField from './FormField';
import { Minus, Plus } from 'lucide-react';

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  error?: string;
  required?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  error,
  required = false,
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <FormField label={label} error={error} required={required}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className={`p-2 bg-dark-gray/40 border border-ice-blue/30 rounded-l-md text-ice-blue 
                    transition-all duration-300 hover:bg-ice-blue/20 ${
                      value <= min ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
          disabled={value <= min}
        >
          <Minus size={18} />
        </button>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || min)}
          min={min}
          max={max}
          className="w-16 text-center py-2 bg-dark-gray/20 backdrop-blur-sm border-t border-b border-ice-blue/30
                  text-white focus:outline-none"
          readOnly
        />
        <button
          type="button"
          onClick={handleIncrement}
          className={`p-2 bg-dark-gray/40 border border-ice-blue/30 rounded-r-md text-ice-blue 
                    transition-all duration-300 hover:bg-ice-blue/20 ${
                      value >= max ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
          disabled={value >= max}
        >
          <Plus size={18} />
        </button>
      </div>
    </FormField>
  );
};

export default NumberInput;