import React from 'react'
import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';
import { faChartSimple as fasChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function PostCard({ data }) {

    return (
        <div className="w-[340px] flex flex-col gap-2.5 shadow-md">
            <div className="w-full">
                <img src={data.img} className="w-full object-cover" />
            </div>
            <div className='px-6 gap-2.5 flex flex-col'>
                <div className="flex gap-2.5 pt-2.5 text-xs leading-4 text-[#737373]">
                    <a href="" className='text-[#8EC2F2]'>Google</a>
                    <a href="">Trending</a>
                    <a href="">New</a>
                </div>
                <h3 className='text-xl leading-7 text-[#252B42]'>{data.title}</h3>
                <p className='text-sm text-[#737373] leading-5'>{data.info}</p>
                <div className="py-2.5 flex w-full justify-between">
                    <div className='flex gap-1.5 items-center'>
                        <FontAwesomeIcon icon={farClock} className='text-[#23A6F0]' />
                        <p className='text-xs leading-4 text-[#737373]'>{data.date}</p>
                    </div>
                    <div className='flex gap-1.5 items-center'>
                        <FontAwesomeIcon icon={fasChartSimple} className='text-[#23856D]' />
                        <p className='text-xs leading-4 text-[#737373]'>{data.commentCount} comments</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 pb-9'>
                    <a href=''><p className='font-bold text-sm leading-4 text-[#737373]'>Learn More</p></a>
                    <a href=''><span className='text-4xl text-[#23A6F0]'>{">"}</span></a>
                </div>
            </div>


        </div>
    )
}