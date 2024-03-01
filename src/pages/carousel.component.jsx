// carousel.component.jsx
import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current >= slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current <= 0 ? slides.length - 1 : current - 1);
  };

  return (
    <div className="relative w-[506px] h-[450px] overflow-hidden">
      <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <img key={index} src={slide} alt={`Slide ${index}`} className="w-full h-full object-contain" />
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button onClick={prevSlide} className="text-white text-3xl">
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide} className="text-white text-3xl">
          <BsFillArrowRightCircleFill />
        </button>
      </div>
      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((_, index) => (
          <div
            onClick={() => setCurrent(index)}
            key={index}
            className={`cursor-pointer rounded-full w-5 h-5 ${index === current ? "bg-white" : "bg-gray-500"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
