import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  console.log(hotels);

  const topRowsHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="mt-10 space-y-5">
      <h2 className="text-xl text-slate-500 font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        {/* Top Row Hotels */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowsHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        {/* Bottom Row Hotels */}
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
