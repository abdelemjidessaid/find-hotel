import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-md border border-slate-300 p-5 h-fit">
      {/* Booking Title */}
      <h2 className="text-xl font-semibold">Your Booking Details</h2>
      {/* Hotel Location */}
      <div className="border-b py-2">
        Location:{" "}
        <span className="text-sm font-semibold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</span>
      </div>
      {/* Hotel CheckIn & CheckOut */}
      <div className="flex justify-between border-b py-2">
        {/* Check In */}
        <div>
          Check-in:
          <div className="text-sm font-semibold">{checkIn.toDateString()}</div>
        </div>
        {/* Check Out */}
        <div className="bordr-b">
          Check-out:
          <div className="text-sm font-semibold">{checkOut.toDateString()}</div>
        </div>
      </div>
      {/* Hotel Stay Nights */}
      <div className="border-b py-2">
        Total length of stay:
        <div className="text-sm font-semibold">
          {numberOfNights} {numberOfNights > 1 ? "nights" : "night"}
        </div>
      </div>
      {/* Hotel Guests */}
      <div>
        Guests
        <div className="text-sm font-semibold">
          {adultCount} {adultCount > 1 ? "adults" : "adult"} & {childCount}{" "}
          {childCount > 1 ? "children" : "child"}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
