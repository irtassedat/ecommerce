import React, { useEffect, useState, useCallback } from 'react';
import { fetchProducts } from "../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axiosInstance from "../../mock/axiosInstance";
import debounce from 'lodash/debounce';
import ProductCard from "./ProductCard";

export default function Products() {
    const { page } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const { productList, fetchState, productCount, pageCount } = useSelector(state => state.product);
    const [currentPage, setCurrentPage] = useState(page ? parseInt(page, 10) : 1);
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const debouncedSearchTerm = useCallback(debounce((nextValue) => setFilter(nextValue), 30), []);
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
    }, [location.search, currentPage, dispatch]);

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
        const params = new URLSearchParams(location.search);
        params.set('page', newPage);
        history.push({ pathname: location.pathname, search: params.toString() });
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const handleFilter = () => {
        setCurrentPage(1);
        updateQueryParams();
        dispatch(fetchProducts(category, filter, sort, 20, 0, 1));
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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

        if (currentPage > 1) {
            pages.push(
                <button key="first" onClick={() => handlePageClick(1)} className="px-2 py-1 text-gray-500 hover:text-blue-600">
                    {"<<"} İlk
                </button>,
                <button key="prev" onClick={() => handlePageClick(currentPage - 1)} className="px-2 py-1 text-gray-500 hover:text-blue-600">
                    {"<"} Önceki
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (startPage > 2) {
            pages.push(<span key="startEllipsis" className="px-2 py-1">...</span>);
        }

        pages = pages.concat(
            pageNumbers.map(number =>
                <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`px-2 py-1 ${currentPage === number ? 'text-white bg-blue-500' : 'text-blue-600 hover:bg-blue-100'} hover:text-blue-600`}
                >
                    {number}
                </button>
            )
        );

        if (endPage < pageCount - 1) {
            pages.push(<span key="endEllipsis" className="px-2 py-1">...</span>);
        }

        if (currentPage < pageCount) {
            pages.push(
                <button key="next" onClick={() => handlePageClick(currentPage + 1)} className="px-2 py-1 text-gray-500 hover:text-blue-600">
                    Sonraki {">"}
                </button>,
                <button key="last" onClick={() => handlePageClick(pageCount)} className="px-2 py-1 text-gray-500 hover:text-blue-600">
                    Son {">>"}
                </button>
            );
        }

        return <div className="flex justify-center items-center space-x-1 mt-4 pb-14">{pages}</div>;
    };

    return (
        <div className="w-screen flex flex-col">
            <div className="my-0 mx-auto max-w-[1050px]">
                <div className="flex flex-col items-start space-y-4 bg-zinc-200 p-4 rounded-lg shadow mb-6">
                    <div className="bg-white p-2 rounded-lg shadow flex items-center w-full space-x-2">
                        <input
                            type="text"
                            value={filter}
                            onChange={handleSearchChange}
                            placeholder="Ara..."
                            className="outline-none pl-2 flex-grow border-r pr-2"
                        />
                        <select value={category} onChange={handleCategoryChange} className="outline-none flex-grow border-r pr-2">
                            <option value="">Tüm Kategoriler</option>
                            {categoryOptions}
                        </select>
                        <button onClick={handleFilter} className="bg-blue-400 text-white px-3 py-1 rounded-lg">Filtrele</button>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span>
                            Showing: <strong>{productCount}</strong> Search results
                        </span>
                        <div className="flex items-center space-x-2">
                            <span>Filtrele:</span>
                            <select name="sort" id="sort" value={sort} onChange={handleSortChange} className="outline-none bg-white p-2 rounded-lg shadow">
                                <option value="">Sıralama Seçin</option>
                                <option value="price:asc">Fiyata Göre Artan</option>
                                <option value="price:desc">Fiyata Göre Azalan</option>
                                <option value="rating:asc">Puanlama Artan</option>
                                <option value="rating:desc">Puanlama Azalan</option>
                            </select>
                            <div className="flex space-x-2">
                                <img
                                    alt="list view"
                                    src="https://placehold.co/16x16"
                                    className="text-zinc-500"
                                />
                                <img
                                    alt="grid view"
                                    src="https://placehold.co/16x16"
                                    className="text-zinc-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-11">
                    {fetchState === 'FETCHING' ? <p>Loading...</p> : productList.map((item, index) => <ProductCard key={index} data={item} />)}
                </div>
                {renderPagination()}
            </div>
        </div>
    );
}
