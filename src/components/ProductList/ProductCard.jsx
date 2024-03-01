import { Link } from "react-router-dom";

export default function ProductCard({ data, size }) {
    const imageSizeStyle = {
        width: size[0] + 'px',
        height: size[1] + 'px',
    };

    // Ürün adından slug oluşturun (basit bir örnek)
    const productNameSlug = data.name.replace(/\s+/g, '-').toLowerCase();

    return (
        // Link componenti ile tüm kartı saran bir link
        <Link to={`/${data.category_id}/${data.id}/${productNameSlug}`} className="flex flex-col items-center no-underline">
            <img src={data.images[0].url} alt={data.name} style={imageSizeStyle} className="object-cover object-center" />
            <div className="flex flex-col items-center gap-2.5 pt-6 pb-7">
                <h4 className="text-[#252B42] text-base font-bold leading-6">{data.name}</h4>
                <p className="text-[#737373] text-sm font-bold leading-6">{data.description}</p>
                <div className="flex gap-1.5">
                    <p className="text-[#737373] text-base font-bold leading-6">${data.price}</p>
                    {/* İndirimli fiyat varsa gösterilecek kısım */}
                    {/* <p className="text-[#23856D] text-base font-bold leading-6">$5</p> */}
                </div>
                {/* Renk seçenekleri varsa gösterilecek kısım */}
                {/* <div className="flex gap-1.5">
                    {data.colorOptions.map((item, index) => { 
                        return <div key={index} className={`h-4 w-4 rounded-full ${item}`}></div>
                    })}
                </div> */}
            </div>
        </Link>
    );
}
