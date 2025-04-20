import React from 'react';
import FormField from './FormField';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error,
  required = false,
}) => {
  return (
    <FormField label={label} error={error} required={required}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-dark-gray/20 backdrop-blur-sm border border-ice-blue/30 rounded-md 
                 text-white placeholder-ice-blue/50 focus:ring-2 focus:ring-neon-blue focus:border-transparent
                 transition-all duration-300 outline-none hover:border-ice-blue/60"
      />
    </FormField>
  );
};

export default TextInput;