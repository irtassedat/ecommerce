import EditorsPick from "../components/homepage/EditorsPick";
import BestSeller from "../components/homepage/BestSellerProducts";
import SummerCard from "../components/homepage/SummerCard";
import FeaturedPosts from "../components/homepage/FeaturedPosts";
import { firstCarouselContent, secondCarouselContent } from "../mock/carouselContentsData"
import CarouselComponent from "../components/homepage/Carousel";


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
  