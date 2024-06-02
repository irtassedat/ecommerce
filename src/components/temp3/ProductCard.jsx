
export default function ProductCard({ data, size }) {

    return (
        <div className="flex flex-col items-center">
            <img src={data.img} className={`w-[${size[0]}px] h-[${size[1]}px] object-cover object-top`} />
            <div className="flex flex-col items-center gap-2.5 pt-6 pb-7">
                <h4 className="text-[#252B42] text-base font-bold leading-6">{data.productName}</h4>
                <p className="text-[#737373] text-sm font-bold leading-6">{data.secondTitle}</p>
                <div className="flex gap-1.5">
                    <p className="text-[#737373] text-base font-bold leading-6">${data.priceDefault}</p>
                    <p className="text-[#23856D] text-base font-bold leading-6">${data.priceDiscounted}</p>
                </div>
                <div className="flex gap-1.5">
                    {data.colorOptions.map((item, index) => {
                        return <div key={index} className={`h-4 w-4 rounded-full ${item}`}></div>
                    })}
                </div>
            </div>
        </div>

    )
}