
import { imageBasePath } from "../../../public/imgBasePath";

export default function Clients() {

    return (
        <div className="w-screen bg-[#FAFAFA] h-[175px] pt-[50px]">
            <div className="mx-auto my-0 max-w-page-content flex justify-around">
                <img src={imageBasePath + "fa-brands-1.svg"} />
                <img src={imageBasePath + "fa-brands-2.svg"} />
                <img src={imageBasePath + "fa-brands-3.svg"} />
                <img src={imageBasePath + "fa-brands-4.svg"} />
                <img src={imageBasePath + "fa-brands-5.svg"} />
                <img src={imageBasePath + "fa-brands-6.svg"} />
            </div>
        </div>
    )
}


//imageBasePath bir JavaScript (veya daha spesifik olarak, React) uygulamasında kullanılan bir değişkendir. Bu değişken, uygulamanın görüntü dosyalarını sakladığı yolu (URL'yi) tutar.
//imageBasePath değişkeni çeşitli görüntü dosyalarının URL'lerini oluşturmak için kullanılmış. Örneğin, <img src={imageBasePath + "fa-brands-1.svg"} /> satırı, imageBasePath temel URL'ine fa-brands-1.svg dosya adını ekleyerek tam bir görüntü URL'si oluşturur.