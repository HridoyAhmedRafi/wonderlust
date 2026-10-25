import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";
import Testimonials from "@/components/home/testimonials";
import WhyChoose from "@/components/home/why-choose";

const HomePage = () => {
  return (
    <>
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
};

export default HomePage;
