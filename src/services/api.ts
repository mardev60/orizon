import { TravelFormData } from '../types';

const WEBHOOK_URL = 'https://n8n-prod.makeitpost.com/webhook/2065152e-a4ad-4853-878c-ee4dbdcc4a53';

export const submitTravelForm = async (formData: TravelFormData): Promise<any> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};