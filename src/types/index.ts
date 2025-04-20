export interface TravelFormData {
  name: string;
  email: string;
  destination: string;
  start_date: string;
  end_date: string;
  number_of_people: number;
  travel_style: string[];
  budget_per_day: number;
  language_spoken: string[];
  transport_preference: string;
  accommodation_preference: string;
  food_preference: string;
  visited_before: boolean;
  special_requests: string;
}

export type FormErrors = Partial<Record<keyof TravelFormData, string>>;

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: SelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  error?: string;
  required?: boolean;
}

export interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  error?: string;
  required?: boolean;
}

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  required?: boolean;
}

export type Language = 'en' | 'fr';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}