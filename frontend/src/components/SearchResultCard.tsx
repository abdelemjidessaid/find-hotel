import { AiFillStar } from 'react-icons/ai';
import { HotelType } from '../../../backend/src/shared/types';
import { Link } from 'react-router-dom';

type Props = {
  hotel: HotelType;
};
const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-md p-8 gap-8">
      {/* The hotel image */}
      <div className="w-full h-[300px] overflow-hidden rounded-lg hover:rounded-none ease-in-out duration-200 transition-all">
        <img
          src={hotel.imageUrls[0]}
          alt="The hotel image"
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* The hotel details */}
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        {/* Hotel Star Rating and its type... */}
        <div className="flex flex-row justify-between">
          <div>
            {/* Hotel name */}
            <Link
              to={`/detail/${hotel._id}`}
              className="text-lg font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
            {/* Hotel start rating and type*/}
            <div className="flex items-center">
              {/* Hotel start rating */}
              <span className="flex">
                {Array.from({ length: hotel.starRating }).map(() => (
                  <AiFillStar className="fill-yellow-400" />
                ))}
              </span>
              {/* Hotel type */}
              <span className="ml-2 text-xs uppercase font-semibold">
                {hotel.type}
              </span>
            </div>
          </div>
          {/* Hotel Price */}
          <span className="text-green-700 text-xl font-bold">
            ${hotel.pricePerNight}{' '}
            <span className="text-slate-700 text-xs font-semibold">
              per night
            </span>
          </span>
        </div>
        {/* Hotel Description */}
        <div>
          <div className="line-clamp-4 text-sm font-normal">
            {hotel.description}
          </div>
        </div>
        {/* Hotel facilities and others */}
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          {/* Hotel Facilities */}
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-green-300 p-2 rounded-lg font-semibold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          {/* Others */}
          <div className="flex flex-col items-end gap-1">
            <Link
              to={`/detail/${hotel._id}`}
              className="text-white text-sm font-semibold rounded-md max-w-fit bg-blue-600 p-2 hover:bg-blue-500 transition-all ease-in-out duration-200"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
