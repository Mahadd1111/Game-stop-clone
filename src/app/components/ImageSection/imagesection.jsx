"use client"

import { useState } from "react"
import Image from "next/image"

const ImageSection = ({images})=>{
    console.log(images)
    const [mainImage,setMainImage] = useState(images[0])
    const changeMainImage = (imageUrl)=>{
        setMainImage(imageUrl)
    }
    return(
        <div className="bg-white grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-2 flex lg:flex-col gap-4 py-10">
                {
                    images.map((imageUrl,index)=>{
                        return(
                            <div key={index} className={`relative hover:cursor-pointer w-24 h-20 ${mainImage===imageUrl?"border-2 border-black":""}`} onClick={()=>setMainImage(imageUrl)} onMouseOver={()=>setMainImage(imageUrl)}>
                                <Image className="py-1 px-1" fill={true} src={imageUrl} alt="video game"></Image>
                            </div>
                        )
                    })
                }
            </div>
            <div className="lg:col-span-10 py-2 lg:py-10 bg-white">
                <div className="relative w-full h-[500px] bg-white">
                    <Image fill={true} src={mainImage} alt="video game"></Image>
                </div>
            </div>
        </div>
    )
}

export default ImageSection