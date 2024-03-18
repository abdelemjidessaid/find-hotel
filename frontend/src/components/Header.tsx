import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import "../../public/icon.png";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-teal-700 py-6">
      <div className="container mx-auto flex justify-between">
        {/* header logo */}
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to="/" className="flex items-center gap-3 ">
            <img src="icon.png" className="w-10" />
            Find Hotels
          </Link>
        </span>
        {/* sign-in button */}
        <span className="flex space-x-2">
          {isLoggedIn ? (
            // if logged in show these components
            <>
              <Link
                to="/my-bookings"
                className="flex items-center text-sm text-white rounded-md px-3 font-semibold hover:bg-teal-600 transition-all ease-in-out duration-200"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center text-sm text-white rounded-md px-3 font-semibold hover:bg-teal-600 transition-all ease-in-out duration-200"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            // if not logged in show the sign in button
            <Link
              to="/sign-in"
              className="flex items-center bg-transparent border-2 border-white rounded-md text-white px-3 font-bold hover:bg-white hover:text-teal-600 transition-all ease-in-out duration-200"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
