import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold mb-3">Add Hotel</h1>
      {/* name input */}
      <label className="text-gray-700 flex-1 text-sm font-semibold">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
          {...register('name', { required: '* This field is required !' })}
        ></input>
        {errors.name && (
          <span className="text-red-500 text-xs font-medium">
            {errors.name.message}
          </span>
        )}
      </label>
      {/* country and city inputs */}
      <div className="flex gap-4">
        {/* city input */}
        <label className="text-gray-700 flex-1 text-sm font-semibold">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
            {...register('city', { required: '* This field is required !' })}
          ></input>
          {errors.city && (
            <span className="text-red-500 text-xs font-medium">
              {errors.city.message}
            </span>
          )}
        </label>
        {/* country input */}
        <label className="text-gray-700 flex-1 text-sm font-semibold">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
            {...register('country', { required: '* This field is required !' })}
          ></input>
          {errors.country && (
            <span className="text-red-500 text-xs font-medium">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      {/* description input */}
      <label className="text-gray-700 flex-1 text-sm font-semibold">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
          {...register('description', {
            required: '* This field is required !',
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-xs font-medium">
            {errors.description.message}
          </span>
        )}
      </label>
      <div className="flex gap-4">
        {/* price per night input */}
        <label className="flex-1 text-gray-700 max-w-[50%] text-sm font-semibold">
          Price Per Night
          <input
            type="number"
            min={1}
            className="border rounded h-9 w-full py-1 px-2 font-normal outline-none focus:border-gray-400"
            {...register('pricePerNight', {
              required: '* This field is required !',
            })}
          ></input>
          {errors.pricePerNight && (
            <span className="text-red-500 text-xs font-medium">
              {errors.pricePerNight.message}
            </span>
          )}
        </label>
        {/* Star rating select */}
        <label className="flex-1 text-gray-700 max-w-[50%] text-sm font-semibold">
          Star Rating
          <select
            {...register('starRating', {
              required: '* This field is required !',
            })}
            className="border rounded h-9 w-full p-2 text-gray-700 font-normal bg-white"
          >
            <option value="" className="text-sm font-semibold">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 text-xs font-medium">
              {errors.starRating.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
