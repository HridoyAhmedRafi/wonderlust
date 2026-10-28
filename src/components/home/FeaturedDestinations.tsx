import DestinationCard from "@/components/destination/destination-card";
import { IDestination } from "@/lib/destinations";

const FeaturedDestinations = async () => {
  const res = await fetch("http://localhost:5000/featured-destinations");
  const data = await res.json();

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-4">
      <div className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {data.map((destination: IDestination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinations;
