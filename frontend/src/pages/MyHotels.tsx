import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    'fetchMyHotels',
    apiClient.fetchMyHotels,
    {
      onError: () => {
        // handle the error
      },
    }
  );

  if (!hotelData) {
    return (
      <span className="text-gray-500 text-center text-xl font-normal border-l-2 border-red-400 py-2 px-4">
        No Hotels Found
      </span>
    );
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-2xl font-bold my-auto">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex rounded-md px-4 py-2 bg-blue-600 text-white text-sm font-semibold p-2 hover:bg-blue-500 transition-all ease-in-out duration-200"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-lg font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line text-base">
              {hotel.description}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {/* Hotel location */}
              <div className="text-sm  border border-slate-300 rounded p-3 flex items-center justify-center gap-2">
                <BsMap />
                {hotel.city}, {hotel.country}
              </div>
              {/* Hotel type */}
              <div className="text-sm  border border-slate-300 rounded p-3 flex items-center justify-center gap-2">
                <BsBuilding />
                {hotel.type}
              </div>
              {/* Hotel price */}
              <div className="text-sm  border border-slate-300 rounded p-3 flex items-center justify-center gap-2">
                <BiMoney />${hotel.pricePerNight} per night
              </div>
              {/* Hotel children */}
              <div className="text-sm  border border-slate-300 rounded p-3 flex items-center justify-center gap-2">
                <BiHotel />
                {hotel.adultCount} {hotel.adultCount < 2 ? 'adult' : 'adults'},{' '}
                {hotel.childCount} {hotel.childCount < 2 ? 'child' : 'children'}
              </div>
              {/* Hotel rating */}
              <div className="text-sm  border border-slate-300 rounded p-3 flex items-center justify-center gap-2">
                <BiStar />
                {hotel.starRating} Star rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-600 rounded-md text-white text-sm font-normal px-4 py-2 hover:bg-blue-500 transition-all ease-in-out duration-200"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
