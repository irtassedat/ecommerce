import Clients from "../components/ProductList/Clients";
import ProductCategories from "../components/ProductList/ProductCategories";
import Products from "../components/ProductList/Products";


export default function ProductListPage() {

    return (
        <>
            <ProductCategories />
            <Products />
            <Clients />
        </>
    )
}
