import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate('/sign-in', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-teal-300 gap-4 rounded-md">
      <h3 className="text-base font-semibold">${pricePerNight} per night</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          {/* Check In Date Picker */}
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue('checkIn', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              wrapperClassName="min-w-full"
              className="min-w-full rounded-md text-sm font-normal bg-white p-2 focus:outline-none"
            />
          </div>
          {/* Check Out Date Picker */}
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue('checkOut', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              wrapperClassName="min-w-full"
              className="min-w-full rounded-md text-sm font-normal bg-white p-2 focus:outline-none"
            />
          </div>
          {/* Adult and Child Inputs */}
          <div className="flex rounded-md bg-white p-1 gap-2 font-normal text-sm">
            {/* Adults Input */}
            <label className="items-center flex">
              Adults:
              <input
                type="number"
                min={1}
                max={20}
                {...register('adultCount', {
                  required: '* This field is required',
                  min: { value: 1, message: 'There must be at least 1' },
                  valueAsNumber: true,
                })}
                className="w-full p-1 focus:outline-none font-bold"
              />
            </label>
            {/* Children Input */}
            <label className="items-center flex">
              Children:
              <input
                type="number"
                min={0}
                max={20}
                {...register('childCount', {
                  valueAsNumber: true,
                })}
                className="w-full p-1 focus:outline-none font-bold"
              />
            </label>
            {errors.adultCount && (
              <span className="text-sm font-normal text-red-400">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="rounded-md bg-blue-600 text-white text-sm w-full p-2 font-normal hover:bg-blue-500 ease-in-out transition-all duration-200">
              Book Now
            </button>
          ) : (
            <button className="rounded-md bg-blue-600 text-white text-sm w-full p-2 font-normal hover:bg-blue-500 ease-in-out transition-all duration-200">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
