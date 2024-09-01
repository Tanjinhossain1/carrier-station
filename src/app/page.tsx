import BannerCarousel from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  // const loopArray = Array.from({ length: 100 }); // Creates an array with 100 elements

  return (
    <div>
       <Navbar />
       <div className="md:mt-[100px]" />
       <BannerCarousel />
        
       {/* {loopArray.map((_, index) => (
        <h1 className="text-center" key={index}>Stationary Text</h1> // Renders <h1> 100 times
      ))} */}
       
    </div>
  );
}
