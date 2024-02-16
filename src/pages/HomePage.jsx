import EditorsPick from "../components/HomePage/EditorsPick";
import BestSeller from "../components/HomePage/BestSellerProducts";
import SummerCard from "../components/HomePage/SummerCard";
import FeaturedPosts from "../components/HomePage/FeaturedPosts";
import { firstCarouselContent, secondCarouselContent } from "../mock/carouselContentsData"
import CarouselComponent from "../components/HomePage/Carousel";


export default function HomePage() {
    return (
      <>
        <CarouselComponent items={firstCarouselContent} />
        <EditorsPick />
        <SummerCard />
        <BestSeller />
        <CarouselComponent items={secondCarouselContent} />
        <FeaturedPosts />
      </>
    );
  }
  