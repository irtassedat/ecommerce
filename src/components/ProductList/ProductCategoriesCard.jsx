import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCategoriesCard({ data }) {
    return (
        <Link to={`/shopping/${data.gender}/${data.code}`} className="w-[205px] h-[205px] flex flex-col items-center justify-center bg-cover text-center rounded-lg" style={{ backgroundImage: `url(${data.img})` }}>
            <div className="text-white text-xl font-bold hover:text-gray-200 bg-black bg-opacity-50 w-full h-full flex flex-col justify-center">
                <h4 className="font-bold leading-6">{data.title}</h4>
                <p className="text-sm leading-5">{data.rating} Stars</p>
            </div>
        </Link>
    );
}
