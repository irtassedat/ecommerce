// `react-slick` kütüphanesinden Slider'ı farklı bir isimle içe aktarın
import SlickSlider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Kendi Slider bileşeninizi tanımlayın
export default function Slider() {
  // Slider bileşeninizin mantığı
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <SlickSlider {...settings}>
      {/* Slider içerisinde gösterilecek içerik */}
    </SlickSlider>
  );
}
