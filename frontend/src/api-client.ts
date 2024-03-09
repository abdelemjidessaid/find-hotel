import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';
import { HotelType } from '../../backend/src/shared/types';

// api base url
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Registring a new user.
 * @param formData the data that comes from the registration form.
 */
export const register = async (formData: RegisterFormData) => {
  // send data to the api for registration
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  // extract response body
  const responseBody = await response.json();
  // if registration operation not OK
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

/**
 * Signing in.
 * @param formData the information that comes from the sign in form.
 * @returns respone about the sing in.
 */
export const SignIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

/**
 * Verifying the token validaty.
 * @returns the response of the token validation.
 */
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Token invalid');
  }

  return response.json();
};

/**
 * Sign Out.
 */
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Error during sign out');
  }
};

/**
 * Adding a new hotel.
 * @param hotelFormData the hotel data submited with the form.
 * @returns response of inserting the new hotel result.
 */
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error('The Hotel addition failed!');
  }

  return response.json();
};

/**
 * Fetching all hotels of the current user.
 * @returns array of all the user hotels.
 */
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  // fetch the current user's hotels
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include',
  });

  // check the response
  if (!response.ok) {
    throw new Error('Error fetching hotels!');
  }

  return response.json();
};

/**
 * Fetching the hotel by its id
 * @param hotelId the specific hotel id.
 * @returns the data of the spesific hotel.
 */
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching the specific Hotel!');
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      credentials: 'include',
      body: hotelFormData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update hotel!');
  }

  return response.json();
};
