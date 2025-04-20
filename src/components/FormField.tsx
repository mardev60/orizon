import React from 'react';
import { FormFieldProps } from '../types';

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  error, 
  required = false, 
  children 
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2 text-ice-blue">
        {label} {required && <span className="text-neon-blue">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-error-red">{error}</p>
      )}
    </div>
  );
};

export default FormField;