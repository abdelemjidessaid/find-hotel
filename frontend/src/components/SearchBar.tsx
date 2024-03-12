import { FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search');
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-2 bg-teal-400 rounded-md shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      {/* Destination Input */}
      <div className="flex flex-row items-center flex-1 rounded-md bg-white p-2 gap-2">
        <MdTravelExplore size={25} />
        <input
          type="text"
          placeholder="Where are you going ?"
          className="text-sm w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
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
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
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
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
            className="w-full p-1 focus:outline-none font-bold"
          />
        </label>
      </div>
      {/* Date Picker of Check In */}
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
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
      {/* Date Picker of Check Out */}
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          wrapperClassName="min-w-full"
          className="min-w-full rounded-md text-sm font-normal bg-white p-2 focus:outline-none"
        />
      </div>
      {/* Submit and Reset Buttons */}
      <div className="flex gap-1">
        <button className="w-2/3 p-2 bg-blue-600 hover:bg-blue-500 rounded-md text-sm text-white font-normal h-full transition-all ease-in-out duration-200">
          Search
        </button>
        <button className="w-1/3 p-2 bg-red-400 hover:bg-red-300 rounded-md text-sm text-white font-normal h-full transition-all ease-in-out duration-200">
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
