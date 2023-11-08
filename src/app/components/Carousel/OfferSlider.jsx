"use client"

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import './offerSlider.css'


const OfferSlide = ({data}) => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
        >
            {
                data.map((item,index)=>{
                    return(
                        <SwiperSlide key={item.id}>
                            <div className="relative h-44 w-full">
                                <Image src={item['imgUrl']} fill={true} alt='game promo'></Image>
                            </div>
                            <div className="h-8 bg-white"></div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
};

export default OfferSlide