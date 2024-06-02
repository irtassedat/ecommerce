
export default function ProductCardSecond({ data }) {

    return (
        <div className="w-[240px] h-[442px] bg-white">
            <img src={data.img} className="w-full h-[280px] object-cover object-top	" />
            <div className="flex flex-col gap-2.5 pl-6 pt-6">
                <h4 className="text-main text-base font-bold leading-6">{data.productName}</h4>
                <p className="text-gray text-sm font-bold leading-6">{data.secondTitle}</p>
                <div className="flex gap-1.5">
                    <p className="text-gray text-base font-bold leading-6">${data.priceDefault}</p>
                    <p className="text-[#23856D] text-base font-bold leading-6">${data.priceDiscounted}</p>
                </div>
            </div>

        </div>
    )
}