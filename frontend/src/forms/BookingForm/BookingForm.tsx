import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved 👏", type: "SUCCESS" });
      },
      onError: () => {
        // handle error
        showToast({ message: "Error saving booking!!", type: "ERROR" });
      },
    }
  );

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      // book the room
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-md border border-slate-300 p-5"
    >
      {/* Form Title  */}
      <span className="text-xl font-semibold">Confirm Your Details</span>
      {/* Form Inputs  */}
      <div className="grid grid-cols-2 gap-6">
        {/* FirstName input  */}
        <label className="text-gray-700 text-sm font-semibold flex-1">
          First Name
          <input
            type="text"
            readOnly
            disabled
            {...register("firstName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        {/* LastName input  */}
        <label className="text-gray-700 text-sm font-semibold flex-1">
          Last Name
          <input
            type="text"
            readOnly
            disabled
            {...register("lastName")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        {/* Email input  */}
        <label className="text-gray-700 text-sm font-semibold flex-1">
          Email
          <input
            type="email"
            readOnly
            disabled
            {...register("email")}
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
      </div>
      {/* Pyament Total */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Your Price Summary</h2>

        <div className="bg-teal-200  p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-sm text-gray-700 font-normal mt-1">
            Includes taxes and charges
          </div>
        </div>
      </div>
      {/* Pyament Details */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Payment Details</h2>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white text-base font-semibold rounded-md py-2 px-4 disabled:bg-gray-500 hover:bg-blue-500 transition-all ease-in-out duration-200"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
