import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getTranslation } from '../utils/translations';
import { Language } from '../types';
import TextInput from './TextInput';
import TextArea from './TextArea';
import NumberInput from './NumberInput';
import DateRangePicker from './DateRangePicker';
import MultiSelect from './MultiSelect';
import Select from './Select';
import Toggle from './Toggle';
import SliderInput from './RangeSlider';
import Button from './Button';
import { TravelFormData, FormErrors } from '../types';
import { validateForm, isFormValid } from '../utils/validation';
import { submitTravelForm } from '../services/api';
import { travelStyleOptions, languageOptions, transportOptions } from '../utils/mockData';
import { Plane as PlaneFill, Globe2, Sparkles } from 'lucide-react';
import TravelTimeline from './TravelTimeline';

interface TravelFormProps {
  language: Language;
}

const TravelForm: React.FC<TravelFormProps> = ({ language }) => {
  const [formData, setFormData] = useState<TravelFormData>({
    name: '',
    email: '',
    destination: '',
    start_date: '',
    end_date: '',
    number_of_people: 1,
    travel_style: [],
    budget_per_day: 70,
    language_spoken: [],
    transport_preference: '',
    accommodation_preference: '',
    food_preference: '',
    visited_before: false,
    special_requests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  const handleChange = (field: keyof TravelFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFormData({
      ...formData,
      start_date: start ? start.toISOString().split('T')[0] : '',
      end_date: end ? end.toISOString().split('T')[0] : '',
    });
  };

  const handleNumberChange = (field: keyof TravelFormData) => (value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMultiSelectChange = (field: keyof TravelFormData) => (selected: string[]) => {
    setFormData({ ...formData, [field]: selected });
  };

  const handleSelectChange = (field: keyof TravelFormData) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleToggleChange = (field: keyof TravelFormData) => (checked: boolean) => {
    setFormData({ ...formData, [field]: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (isFormValid(validationErrors)) {
      setLoading(true);
      try {
        const response = await submitTravelForm(formData);
        setResponseData(response);
        setSubmitted(true);
      } catch (err) {
        console.error('Form submission error:', err);
        setErrors({ ...errors, submit: 'Failed to submit form. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setResponseData(null);
    setFormData({
      name: '',
      email: '',
      destination: '',
      start_date: '',
      end_date: '',
      number_of_people: 1,
      travel_style: [],
      budget_per_day: 70,
      language_spoken: [],
      transport_preference: '',
      accommodation_preference: '',
      food_preference: '',
      visited_before: false,
      special_requests: '',
    });
  };

  if (submitted && responseData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto p-8 bg-dark-gray/30 backdrop-blur-md rounded-xl border border-ice-blue/30 shadow-glow"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-blue/20 border border-neon-blue/40 mb-4">
            <Sparkles className="text-neon-blue" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {getTranslation('tripSuccess', language)}
          </h2>
          <p className="text-ice-blue">
            {getTranslation('tripSuccessSubtitle', language)} {formData.destination}.
          </p>
        </div>

        {responseData[0]?.output && (
          <div className="bg-black/20 rounded-lg p-6 mb-6">
            <h3 className="text-xl text-white font-medium mb-4">Trip Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-ice-blue mb-2">
                  <span className="text-white font-medium">Destination:</span> {responseData[0].output.destination}
                </p>
                <p className="text-ice-blue mb-2">
                  <span className="text-white font-medium">Dates:</span> {responseData[0].output.start_date} to {responseData[0].output.end_date}
                </p>
                <p className="text-ice-blue mb-2">
                  <span className="text-white font-medium">Total Days:</span> {responseData[0].output.days.length}
                </p>
              </div>
              <div>
                <p className="text-ice-blue mb-2">
                  <span className="text-white font-medium">Currency:</span> {responseData[0].output.currency}
                </p>
                <p className="text-ice-blue mb-2">
                  <span className="text-white font-medium">Estimated Budget:</span> €{responseData[0].output.total_budget_estimated}
                </p>
                <p className="text-ice-blue mb-2">
                  <span className="text-white font-medium">Daily Budget:</span> €{Math.round(responseData[0].output.total_budget_estimated / responseData[0].output.days.length)}
                </p>
              </div>
            </div>

            {responseData[0].output.days && responseData[0].output.days.length > 0 && (
              <div className="mt-6">
                <h4 className="text-white font-medium mb-6 text-2xl">Your Adventure Timeline</h4>
                <TravelTimeline days={responseData[0].output.days} />
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <Button type="button" onClick={handleReset}>
            {getTranslation('planAnotherTrip', language)}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-8 bg-dark-gray/30 backdrop-blur-md rounded-xl border border-ice-blue/30 shadow-glow"
    >
      <div className="flex justify-center items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white">Orizon Travel</h1>
          <Globe2 className="text-neon-blue" size={28} />
        </div>
      </div>
      
      <h2 className="text-xl text-center text-ice-blue font-medium mb-8">
        {getTranslation('planYourJourney', language)}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <TextInput
            id="name"
            label={getTranslation('fullName', language)}
            value={formData.name}
            onChange={handleChange('name')}
            placeholder={getTranslation('fullNamePlaceholder', language)}
            error={errors.name}
            required
          />
          <TextInput
            id="email"
            label={getTranslation('email', language)}
            value={formData.email}
            onChange={handleChange('email')}
            type="email"
            placeholder={getTranslation('emailPlaceholder', language)}
            error={errors.email}
            required
          />
        </div>

        <TextInput
          id="destination"
          label={getTranslation('destination', language)}
          value={formData.destination}
          onChange={handleChange('destination')}
          placeholder={getTranslation('destinationPlaceholder', language)}
          error={errors.destination}
          required
        />

        <DateRangePicker
          startDate={formData.start_date ? new Date(formData.start_date) : null}
          endDate={formData.end_date ? new Date(formData.end_date) : null}
          onChange={handleDateChange}
          error={errors.start_date || errors.end_date}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <NumberInput
            id="number_of_people"
            label={getTranslation('numberOfPeople', language)}
            value={formData.number_of_people}
            onChange={handleNumberChange('number_of_people')}
            min={1}
            max={10}
            error={errors.number_of_people}
            required
          />
          
          <SliderInput
            id="budget_per_day"
            label={getTranslation('budgetPerDay', language)}
            value={formData.budget_per_day}
            onChange={handleNumberChange('budget_per_day')}
            min={10}
            max={500}
            step={10}
            error={errors.budget_per_day}
            required
          />
        </div>

        <MultiSelect
          label={getTranslation('travelStyle', language)}
          options={travelStyleOptions}
          selected={formData.travel_style}
          onChange={handleMultiSelectChange('travel_style')}
          error={errors.travel_style}
          required
        />

        <MultiSelect
          label={getTranslation('languagesSpoken', language)}
          options={languageOptions}
          selected={formData.language_spoken}
          onChange={handleMultiSelectChange('language_spoken')}
          error={errors.language_spoken}
        />

        <Select
          id="transport_preference"
          label={getTranslation('transportPreference', language)}
          options={transportOptions}
          value={formData.transport_preference}
          onChange={handleSelectChange('transport_preference')}
          error={errors.transport_preference}
          required
        />

        <TextArea
          id="accommodation_preference"
          label={getTranslation('accommodationPreference', language)}
          value={formData.accommodation_preference}
          onChange={handleChange('accommodation_preference')}
          placeholder={getTranslation('accommodationPlaceholder', language)}
          error={errors.accommodation_preference}
          required
        />

        <TextInput
          id="food_preference"
          label={getTranslation('foodPreference', language)}
          value={formData.food_preference}
          onChange={handleChange('food_preference')}
          placeholder={getTranslation('foodPreferencePlaceholder', language)}
          error={errors.food_preference}
        />

        <Toggle
          label={getTranslation('visitedBefore', language)}
          checked={formData.visited_before}
          onChange={handleToggleChange('visited_before')}
        />

        <TextArea
          id="special_requests"
          label={getTranslation('specialRequests', language)}
          value={formData.special_requests}
          onChange={handleChange('special_requests')}
          placeholder={getTranslation('specialRequestsPlaceholder', language)}
          error={errors.special_requests}
          rows={3}
        />

        <div className="mt-8 flex justify-center">
          <Button type="submit" loading={loading}>
            {getTranslation('planMyTrip', language)}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TravelForm;