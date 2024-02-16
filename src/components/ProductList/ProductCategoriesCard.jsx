

export default function ProductCategoriesCard({ data }) {

    return (
        <div className={`w-[205px] aspect-square ${data.img} flex flex-col gap-2.5 justify-center items-center text-white grayscale-[60%]`}>
            <h4 className="font-bold leading-6">{data.categoryName}</h4>
            <p className="text-sm leading-5">{data.itemCount} Items</p>
        </div>
    )
}