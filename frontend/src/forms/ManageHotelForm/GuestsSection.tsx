import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      {/* Hotel guests title */}
      <h2 className="text-xl font-semibold mb-3">Guests</h2>
      <div className="grid grid-cols-2 gap-5">
        {/* adults count input */}
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            className="border rounded h-9 w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
            min={1}
            {...register('adultCount', {
              required: '* This field is required !',
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-xs font-medium">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        {/* adults count input */}
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            className="border rounded h-9 w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
            min={0}
            {...register('childCount', {
              required: '* This field is required !',
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-xs font-medium">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
