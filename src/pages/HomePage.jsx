import Slider from "../components/HomePage/Slider";
import EditorsPick from "../components/HomePage/EditorsPick";
import BestSeller from "../components/HomePage/BestSellerProducts";
import SummerCard from "../components/HomePage/SummerCard";
import FeaturedPosts from "../components/HomePage/FeaturedPosts";
import SocialMediaLinks from "../components/HomePage/SocialMediaLinks";


export default function HomePage() {
    return (
      <>
        <Slider />
        <EditorsPick />
        <SummerCard />
        <BestSeller />

        <SocialMediaLinks />
        <FeaturedPosts />
      </>
    );
  }
  

/* slider,
editorspick,
bestseller,
slider,tekrarlandı,
summercard,
featuredposts,
bandage,icon
getintoch*/