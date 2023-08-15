
import Image from 'next/image'

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/pagination"



export default function PostImage({ images }) {

    return (
        <div className='bg-slate-400 dark:bg-slate-700'>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#a653ec",
                    "--swiper-navigation-size": "20px",
                    "--swiper-pagination-color": "#cd00cd",
                    // "--swiper-pagination-bullet-inactive-color": "#999999",
                    // "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "6px",
                    // "--swiper-pagination-bullet-horizontal-gap": "6px"
                }}
                navigation
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className=""
            >
                {images.map((url, index) => (
                    <SwiperSlide key={index} virtualIndex={index} className='rect-img-container'>
                        <Image src={url} className='rect-img' unoptimized fill alt='Post' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}