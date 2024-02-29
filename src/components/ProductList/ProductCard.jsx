

export default function ProductCard({ data, size }) {

    const imageSizeStyle = {
        width: size[0] + 'px',
        height: size[1] + 'px',
    };        

    return (
        <div className="flex flex-col items-center">
            <img src={data.images[0].url} alt={data.name} style={imageSizeStyle} className="object-cover object-center" />
            <div className="flex flex-col items-center gap-2.5 pt-6 pb-7">
                <h4 className="text-[#252B42] text-base font-bold leading-6">{data.name}</h4>
                <p className="text-[#737373] text-sm font-bold leading-6">{data.description}</p>
                <div className="flex gap-1.5">
                    <p className="text-[#737373] text-base font-bold leading-6">${data.price}</p>
                    <p className="text-[#23856D] text-base font-bold leading-6">$5{/*{data.priceDiscounted}*/}</p>
                </div>
                <div className="flex gap-1.5">
                    {/*{data.colorOptions.map((item, index) => { 
                        return <div key={index} className={`h-4 w-4 rounded-full ${item}`}></div>
                    })} */}
                </div>
            </div>
        </div>

    )
}