import React, { useState, useRef, useEffect } from 'react';
import FormField from './FormField';
import { MultiSelectProps } from '../types';
import { ChevronDown, X } from 'lucide-react';

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  label,
  error,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item !== value));
  };

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
          onClick={toggleSelect}
          className="flex flex-wrap min-h-[3rem] px-4 py-2 bg-dark-gray/20 backdrop-blur-sm border border-ice-blue/30 rounded-md 
                  text-white cursor-pointer focus:ring-2 focus:ring-neon-blue focus:border-transparent
                  transition-all duration-300 hover:border-ice-blue/60"
        >
          {selected.length === 0 ? (
            <span className="text-ice-blue/50 py-1">Select options...</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selected.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-1 px-2 py-1 bg-neon-blue/20 border border-neon-blue/40 rounded-md text-white text-sm"
                >
                  <span>{options.find((option) => option.value === value)?.label || value}</span>
                  <button
                    type="button"
                    onClick={(e) => removeOption(e, value)}
                    className="text-white hover:text-error-red transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="ml-auto flex items-center">
            <ChevronDown
              size={18}
              className={`text-ice-blue transition-transform duration-300 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 py-1 bg-dark-gray/80 backdrop-blur-md border border-ice-blue/30 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={`px-4 py-2 cursor-pointer ${
                  selected.includes(option.value)
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

export default MultiSelect;