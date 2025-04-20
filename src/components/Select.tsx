import React, { useState, useRef, useEffect } from 'react';
import FormField from './FormField';
import { SelectOption } from '../types';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((option) => option.value === value)?.label || 'Select an option';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <FormField label={label} error={error} required={required}>
      <div ref={selectRef} className="relative">
        <div
          id={id}
          onClick={toggleSelect}
          className="flex justify-between items-center px-4 py-3 bg-dark-gray/20 backdrop-blur-sm border border-ice-blue/30 rounded-md 
                  text-white cursor-pointer focus:ring-2 focus:ring-neon-blue focus:border-transparent
                  transition-all duration-300 hover:border-ice-blue/60"
        >
          <span className={`${!value ? 'text-ice-blue/50' : ''}`}>{selectedLabel}</span>
          <ChevronDown
            size={18}
            className={`text-ice-blue transition-transform duration-300 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 py-1 bg-dark-gray/80 backdrop-blur-md border border-ice-blue/30 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => selectOption(option.value)}
                className={`px-4 py-2 cursor-pointer ${
                  value === option.value
                    ? 'bg-neon-blue/20 text-white'
                    : 'text-ice-blue hover:bg-dark-gray/40'
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </FormField>
  );
};

export default Select;