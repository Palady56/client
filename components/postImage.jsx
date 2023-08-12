'use client';
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function PostImage({ images }) {

    const imageStyle = {
        // borderRadius: '12px',
        border: '1px solid #000',
        width: '100%',
        height: 'inherit',
        objectPostition: 'center',
        objectFit: 'cover'
    }

    const imageLoader = ({ src, width, quality }) => {
        return `${src}`
    }

    return (
        <div className='w-full h-full'>
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
                slidesPerView={1}
                spaceBetween={0}
                // grabCursor={true}
                navigation
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                className="w-full h-full"

            >
                {images.map((url, index) => (
                    <SwiperSlide key={index} virtualIndex={index} className='max-w-[460px] max-h-[460px]'>
                        <Image src={url} style={imageStyle} loader={imageLoader} width={512} height={256} alt='Post' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}