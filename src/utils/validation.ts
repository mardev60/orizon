import { TravelFormData, FormErrors } from '../types';

export const validateForm = (data: TravelFormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Destination validation
  if (!data.destination.trim()) {
    errors.destination = 'Destination is required';
  }

  // Date validation
  if (!data.start_date) {
    errors.start_date = 'Start date is required';
  }
  if (!data.end_date) {
    errors.end_date = 'End date is required';
  }

  // Number of people validation
  if (data.number_of_people < 1) {
    errors.number_of_people = 'At least 1 person is required';
  }

  // Travel style validation
  if (data.travel_style.length === 0) {
    errors.travel_style = 'Please select at least one travel style';
  }

  // Budget validation
  if (data.budget_per_day <= 0) {
    errors.budget_per_day = 'Please specify a budget';
  }

  // Transport preference validation
  if (!data.transport_preference) {
    errors.transport_preference = 'Transport preference is required';
  }

  // Accommodation preference validation
  if (!data.accommodation_preference.trim()) {
    errors.accommodation_preference = 'Accommodation preference is required';
  }

  return errors;
};

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0;
};