import React from 'react';
import FormField from './FormField';

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  error,
  required = false,
  rows = 4,
}) => {
  return (
    <FormField label={label} error={error} required={required}>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-dark-gray/20 backdrop-blur-sm border border-ice-blue/30 rounded-md 
                 text-white placeholder-ice-blue/50 focus:ring-2 focus:ring-neon-blue focus:border-transparent
                 transition-all duration-300 outline-none hover:border-ice-blue/60 resize-none"
      />
    </FormField>
  );
};

export default TextArea;