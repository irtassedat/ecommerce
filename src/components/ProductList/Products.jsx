import { Button, ButtonGroup } from "reactstrap";
import ProductCard from "./ProductCard";
import React, { useEffect, useState, useCallback} from 'react';
import { fetchProducts, setActivePage } from "../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, useLocation} from 'react-router-dom';
import axiosInstance from "../../mock/axiosInstance";
import debounce from 'lodash/debounce';


export default function Products() {
    const { page } = useParams(); // URL'den sayfa numarasını oku
    const history = useHistory();
    const dispatch = useDispatch();
    const { productList, fetchState, productCount, pageCount,} = useSelector(state => state.product);
    const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useCallback(debounce((nextValue) => setFilter(nextValue), 50), []);
    const location = useLocation();

    useEffect(() => {
        dispatch(fetchProducts(category, searchTerm, sort, 20, (currentPage - 1) * 20));
        history.push(`/shop?page=${currentPage}`);
    }, [dispatch, currentPage, history]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Kategorileri çekerken bir hata oluştu:', error);
            }
        };
    
        fetchCategories();
    }, []);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        // Kullanıcı tarafından seçilen sayfaya göre 20 ürün yüklemek için
        dispatch(fetchProducts("", "", "", 20, (page - 1) * 20, page));
    };
    
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const handleFilter = () => {
        setCurrentPage(1); // Her zaman ilk sayfadan başla
        dispatch(fetchProducts(category, filter, sort, 20, 0, 1));
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        debouncedSearchTerm(value); // Kullanıcı arama yaparken debouncedSearchTerm fonksiyonunu çağırın
    };

    const groupedCategories = categories.reduce((acc, category) => {
        const key = category.gender === "k" ? "Kadın" : "Erkek";
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(category);
        return acc;
    }, {});

    const categoryOptions = Object.entries(groupedCategories).map(([gender, categories]) => (
        <optgroup label={gender} key={gender}>
            {categories.map((category) => (
                <option value={category.id} key={category.id}>
                    {category.title}
                </option>
            ))}
        </optgroup>
    ));

    const renderPagination = () => {
        let pages = [];
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(pageCount, currentPage + 2);
    
        // İlk ve Önceki Butonları
        if (currentPage > 1) {
            pages.push(
                <button key="first" onClick={() => handlePageClick(1)} className="px-4 py-2 text-gray-500 hover:text-blue-600">
                    {"<<"} İlk
                </button>,
                <button key="prev" onClick={() => handlePageClick(currentPage - 1)} className="px-4 py-2 text-gray-500 hover:text-blue-600">
                    {"<"} Önceki
                </button>
            );
        }
    
        // Sayfa Numaraları
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
    
        // Ellipsis için kontrol, sayfa sayısı çok fazla olduğunda
        if (startPage > 2) {
            pages.push(<span key="startEllipsis" className="px-4 py-2">...</span>);
        }
    
        pages = pages.concat(
            pageNumbers.map(number =>
                <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`px-4 py-2 ${currentPage === number ? 'text-white bg-blue-500' : 'text-blue-600 hover:bg-blue-100'} hover:text-blue-600`}
                >
                    {number}
                </button>
            )
        );
    
        if (endPage < pageCount - 1) {
            pages.push(<span key="endEllipsis" className="px-4 py-2">...</span>);
        }
    
        // Sonraki ve Son Butonları
        if (currentPage < pageCount) {
            pages.push(
                <button key="next" onClick={() => handlePageClick(currentPage + 1)} className="px-4 py-2 text-gray-500 hover:text-blue-600">
                    Sonraki {">"}
                </button>,
                <button key="last" onClick={() => handlePageClick(pageCount)} className="px-4 py-2 text-gray-500 hover:text-blue-600">
                    Son {">>"}
                </button>
            );
        }
    
        return <div className="flex justify-center items-center space-x-1 mt-4 pb-14">{pages}</div>;
    };
    
    

    return (
        <div className="w-screen flex flex-col">
            <div className="my-0 mx-auto max-w-[1050px]">
                <div className="flex justify-between items-center py-6">
                    <p className="text-[#737373] font-bold text-sm leading-6">Showing all {productCount} results</p>
                    <input
                        type="text"
                        value={filter}
                        onChange={handleSearchChange}
                        placeholder="Ara..."
                        className="pl-3 pr-10 py-2 border-[1px] w-full max-w-xs text-[#737373] bg-[#DDDDDD] rounded"
                    />
                    <div className="flex items-center gap-3.5">
                        <select value={category}
                        onChange={handleCategoryChange}
                        className="pl-3 pr-10 py-2 border-[1px] w-full max-w-xs text-[#737373] bg-[#DDDDDD] rounded">
                            <option value="">Tüm Kategoriler</option>
                            {categoryOptions}
                        </select>
                        <select name="sort" id="sort" value={sort} onChange={handleSortChange} className="pl-3 pr-10 py-2 border-[1px] w-full max-w-xs text-[#737373] bg-[#DDDDDD] rounded">
                            <option value="">Sıralama Seçin</option>
                            <option value="price:asc">Fiyata Göre Artan</option>
                            <option value="price:desc">Fiyata Göre Azalan</option>
                            <option value="rating:asc">Puanlama Artan</option>
                            <option value="rating:desc">Puanlama Azalan</option>
                        </select>
                        <button onClick={handleFilter} className="px-5 py-2.5 text-white bg-[#23A6F0] rounded">Filtrele</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-11">
                    {fetchState === 'FETCHING' ? <p>Loading...</p> : productList.map((item, index) => <ProductCard key={index} data={item} size={[240, 300]} />)}
                </div>
                {renderPagination()}
            </div>
        </div>
    );
}