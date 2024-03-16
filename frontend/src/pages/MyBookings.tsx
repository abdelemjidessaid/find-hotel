import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return (
      <div className="border-l-4 border-red-400 bg-slate-200 w-full px-4 py-2 text-center text-lg font-semibold">
        No bookings found
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Bookings Title */}
      <h1 className="text-lg text-slate-500 font-semibold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-md p-8">
          {/* Hotel image */}
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Hotel information */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-lg font-bold">
              {hotel.name}
              <div className="text-sm text-gray-800 font-bold">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {/* Hotel Bookings */}
            {hotel.bookings.map((booking) => (
              <div>
                {/* Booking Dates */}
                <div>
                  <span className="text-sm font-bold mr-2">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -{" "}
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-bold mr-2">Guests: </span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
