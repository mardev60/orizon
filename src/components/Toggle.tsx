import React from 'react';
import FormField from './FormField';
import { ToggleProps } from '../types';

const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  error,
  required = false,
}) => {
  return (
    <FormField label={label} error={error} required={required}>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
            checked ? 'bg-neon-blue' : 'bg-dark-gray'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
              checked ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="ml-3 text-sm text-ice-blue">{checked ? 'Yes' : 'No'}</span>
      </div>
    </FormField>
  );
};

export default Toggle;