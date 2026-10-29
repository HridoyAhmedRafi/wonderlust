import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Testimonials from "@/components/home/testimonials";
import WhyChoose from "@/components/home/why-choose";

const HomePage = () => {
  
  return (
    <>
      <Banner />
      <FeaturedDestinations></FeaturedDestinations>
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
};

export default HomePage;
