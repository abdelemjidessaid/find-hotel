import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    'fetchHotelById',
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  // if not hotel return empty fragment
  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      {/* Hotel Name and Rating */}
      <div>
        {/* Hotel Rating */}
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-500" />
          ))}
        </span>
        {/* Hotel Name */}
        <h1 className="text-xl font-semibold">{hotel.name}</h1>
      </div>
      {/* Hotel Images */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      {/* Hotel Facilities */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="text-sm text-center border border-slate-300 rounded-md p-3 hover:bg-teal-100 ease-in-out transition-all duration-200">
            {facility}
          </div>
        ))}
      </div>
      {/* Hotel Description */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        {/* Hotel Description */}
        <div className="whitespace-pre-line text-sm">{hotel.description}</div>
        {/* Hotel Information */}
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
