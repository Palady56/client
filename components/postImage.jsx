'use client';
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function PostImage({images}) {

    const imageStyle = {
        borderRadius: '12px',
        border: '1px solid #000',
        width: '100%',
        height: 'auto',
        objectPostition: '50%',
        objectFit: 'cover'
    }

    const imageLoader = ({src, width, quality}) => {
        return `${src}`
    }

  return (
    <div className='w-[300px] h-[300px]'>
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            // grabCursor={true}
            navigation
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true}}
            className=""
        
        >
            {images.map((url, index) => (
                <SwiperSlide key={index} virtualIndex={index}>
                  <Image src={url} style={imageStyle} loader={imageLoader} width={200} height={200} alt='Post'/> 
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}