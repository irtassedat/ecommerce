import ProductCard from "./ProductCard";
import React, { useEffect, useState, useCallback} from 'react';
import { fetchProducts, } from "../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, useLocation} from 'react-router-dom';
import axiosInstance from "../../mock/axiosInstance";
import debounce from 'lodash/debounce';


export default function Products() {
    const { page } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { productList, fetchState, productCount, pageCount,} = useSelector(state => state.product);
    const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const debouncedSearchTerm = useCallback(debounce((nextValue) => setFilter(nextValue), 50), []);
    const location = useLocation();

    const updateQueryParams = () => {
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (sort) params.set('sort', sort);
        if (filter) params.set('filter', filter);
        history.push({ pathname: '/shop', search: params.toString() });
    };
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageParam = params.get('page');
        const categoryParam = params.get('category');
        const sortParam = params.get('sort');
        const filterParam = params.get('filter');
      
        if (pageParam) setCurrentPage(parseInt(pageParam, 10));
        if (categoryParam) setCategory(categoryParam);
        if (sortParam) setSort(sortParam);
        if (filterParam) setFilter(filterParam);
      
        dispatch(fetchProducts(categoryParam, filterParam, sortParam, 20, (currentPage - 1) * 20));
    }, [location.search]); // location.search'e bağlı olarak tetiklenir
         
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

    const handlePageClick = (newPage) => {
        // Mevcut query parametrelerini al
        const params = new URLSearchParams(location.search);
        // Sayfa numarasını güncelle
        params.set('page', newPage);
        // URL'i güncellenmiş parametrelerle değiştir
        history.push({ pathname: location.pathname, search: params.toString() });
    
        // Sayfa numarası ve diğer filtrelerle ürünleri fetch et
        // Not: Bu kısım zaten location.search değişikliğini dinleyen useEffect içinde yer alıyor.
    };    
    
    const handleSortChange = (event) => {
        setSort(event.target.value);
        //updateQueryParams(); // URL'i güncelle
    };

    const handleFilter = () => {
        setCurrentPage(1);
        updateQueryParams(); // URL'i güncelle
        dispatch(fetchProducts(category, filter, sort, 20, 0, 1));
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        //updateQueryParams(); // URL'i güncelle
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        debouncedSearchTerm(value);
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
