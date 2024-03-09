import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch('type');

  return (
    <div className="flex flex-col gap-5">
      {/* Hotel type title */}
      <h2 className="text-xl font-semibold mb-3">Type</h2>
      {/* Hotel type section */}
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? 'cursor-pointer bg-blue-300 text-sm text-center rounded-full px-4 py-2 font-normal'
                : 'cursor-pointer bg-green-100 text-sm text-center rounded-full px-4 py-2 font-normal'
            }
          >
            <input
              type="radio"
              value={type}
              {...register('type', {
                required: '* This field is required !',
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-xs font-medium">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
