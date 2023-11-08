"use client"

import Image from "next/image"
import Link from "next/link"
import OfferSlider from "./components/Carousel/OfferSlider"
import mainOffers1 from "./dummydata"
import { useEffect, useState } from 'react';


export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const promo1 = mainOffers1.slice(0, 3)
  const promo2 = mainOffers1.slice(3, 6)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Set the breakpoint according to your needs
    };

    handleResize(); // Set the initial state based on screen width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="bg-white overlay">
      <section className="mt-20">
        <div className="relative w-full h-96">
          {
            isDesktop ? <Link className="h-full" href="#"><Image fill={true} src={'/images/home-cover-img.webp'} alt="games"></Image></Link> : <Link className="h-full" href="#"><Image fill={true} src={'/images/home-cover-img-2.jpg'} alt="games"></Image></Link>
          }
        </div>
      </section>
      <section className="mt-5">
        <OfferSlider data={promo1} />
      </section>
      <section className="my-5 px-2 lg:px-16 py-5">
        <div className="relative w-full h-40 rounded-2xl">
          {
            isDesktop ? <Link className="h-full" href="#"><Image className="rounded-2xl" fill={true} src={"/images/controllers.jpeg"} alt="games"></Image></Link> : <Link className="h-full" href="#"><Image className="rounded-2xl" fill={true} src={"/images/controllers-2.webp"} alt="games"></Image></Link>
          }

        </div>
      </section>
      <section className="">
        <div className="rounded-3xl bg-black">
          <div className="px-20 py-10 flex flex-col gap-5 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-5">
              <h1 className="text-white text-2xl lg:text-6xl font-bold">Save Big On Hit Games</h1>
              <h1 className="text-white text-lg lg:text-2xl font-semibold">Get up to 75% off fan favourite titles</h1>
            </div>
            <div>
              <button className="px-4 py-2 border-2 border-white text-white hover:bg-white hover:text-black">Shop Now</button>
            </div>
          </div>
          <div className="px-20 pb-20 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="rounded-xl bg-white hover:scale-105">
              <div className=" px-5 py-3">
                <h1 className="text-slate-500 text-lg">SHOP NOW</h1>
                <h1 className="text-lg text-black font-bold">Video Game Deal</h1>
              </div>
              <div className="relative h-40">
                <Link className="h-full" href="#"><Image className="rounded-b-xl" src={"/images/sale25.webp"} fill={true} alt="game deal"></Image></Link>
              </div>
            </div>
            <div className="rounded-xl bg-white hover:scale-105">
              <div className=" px-5 py-3">
                <h1 className="text-slate-500 text-lg">SHOP NOW</h1>
                <h1 className="text-lg text-black font-bold">Video Game Deal</h1>
              </div>
              <div className="relative h-40">
                <Link className="h-full" href="#"><Image className="rounded-b-xl" src={"/images/sale50.webp"} fill={true} alt="game deal"></Image></Link>
              </div>
            </div>
            <div className="rounded-xl bg-white hover:scale-105">
              <div className=" px-5 py-3">
                <h1 className="text-slate-500 text-lg">SHOP NOW</h1>
                <h1 className="text-lg text-black font-bold">Video Game Deal</h1>
              </div>
              <div className="relative h-40">
                <Link className="h-full" href="#"><Image className="rounded-b-xl" src={"/images/sale75.webp"} fill={true} alt="game deal"></Image></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="px-2 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative hover:shadow-xl h-40">
            <Link className="h-full" href="#"><Image className="rounded-xl" src={"/images/accessory-offer.webp"} fill={true} alt="game deal"></Image></Link>
          </div>
          <div className="relative hover:shadow-xl h-40">
            <Link className="h-full" href="#"><Image className="rounded-xl" src={"/images/tradein-offer.webp"} fill={true} alt="game deal"></Image></Link>
          </div>
        </div>
        <div className="px-10 hidden lg:block mt-20">
          <OfferSlider data={promo2} />
        </div>
      </section>
    </main>
  )
}
