import BannerCarousel from "@/components/Banner";
import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";
import Navbar from "@/components/Navbar";

export default function Home() {
  // const loopArray = Array.from({ length: 100 }); // Creates an array with 100 elements

  return (
    <div >
      <Navbar />
      <div className="md:mt-[100px]" />
      <div className="bg-gray-200 "><BannerCarousel /></div>
      <div className="md:max-w-[1200px] mx-auto mt-8">
        <FlashSale />
        <Categories />
      </div>

      {/* {loopArray.map((_, index) => (
        <h1 className="text-center" key={index}>Stationary Text</h1> // Renders <h1> 100 times
      ))} */}
    </div>
  );
}
