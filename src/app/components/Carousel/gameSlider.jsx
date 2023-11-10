"use client"

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./gameSlider.css"


const GameSlide = ({data}) => {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={5}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
        >
            {
                data.map((item,index)=>{
                    return(
                        <SwiperSlide key={item.id} className="">
                            <div className="shadow-xl">
                                <div className="flex flex-col gap-1 h-24 px-4 py-2">
                                    <p className="text-gray-500 font-light text-md">${item.price}</p>
                                    <p className="text-black font-bold text-md">{item.name}</p>
                                </div>
                                <div className="relative h-60 w-full">
                                    <Image src={item['imgUrl']} fill={true} alt='game promo'></Image>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    );
};

export default GameSlide