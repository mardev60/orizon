import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormField from './FormField';
import { DatePickerProps } from '../types';
import { Calendar } from 'lucide-react';

const DateRangePicker: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  onChange,
  error,
  required = false,
}) => {
  return (
    <FormField label="Travel Dates" error={error} required={required}>
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue">
          <Calendar size={18} />
        </div>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 bg-dark-gray/20 backdrop-blur-sm border border-ice-blue/30 rounded-md 
                    text-white placeholder-ice-blue/50 focus:ring-2 focus:ring-neon-blue focus:border-transparent
                    transition-all duration-300 outline-none hover:border-ice-blue/60"
          placeholderText="Select date range"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </FormField>
  );
};

export default DateRangePicker;