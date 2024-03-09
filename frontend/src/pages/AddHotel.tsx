import { useMutation } from 'react-query';
import ManageHotelFrom from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel saved successfully.', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error while saving the hotel!', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelFrom onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
