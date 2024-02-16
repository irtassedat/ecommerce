import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { categoriesData } from "../../mock/categoriesData";
import ProductCategoriesCard from "./ProductCategoriesCard";

export default function ProductCategories() {

    return (
        <div className="w-screen bg-[rgb(250,250,250)]">
            <div className="max-w-[1088px] mx-auto my-0 px-0.5">
                <div className="px-2 flex items-center justify-between py-6">
                    <h1 className="font-bold text-2xl leading-8 text-[#252B42]">Shop</h1>
                    <div className="flex items-center gap-3.5 font-bold text-sm leading-6">
                        <Link to="/" className="text-[#252B42]">Home</Link>
                        <p className="text-[#BDBDBD] font-thin text-4xl">{">"}</p>
                        <p className="text-[#BDBDBD]">Shop</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3.5 items-center justify-center pb-12">
                    {categoriesData.map((item, index) => {
                        return <ProductCategoriesCard key={index} data={item} />
                    })}
                </div>
            </div>
        </div>
    )
}
