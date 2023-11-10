import ImageSection from "../components/ImageSection/imagesection"
import { product } from "../dummydata.js"
import StarRating from "../components/ImageSection/rating"
import Image from "next/image"

const Product = () => {
    const currProduct = product[0]
    return (
        <div className="bg-white px-2 lg:px-20 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-16">
                <div className="col-span-3">
                    <h1 className="mt-5 text-2xl font-bold text-black lg:hidden">{currProduct.name}</h1>
                    <p className="text-md font-light text-black lg:hidden">{currProduct.manufacturer}</p>
                    <ImageSection images={currProduct.imgUrls} />
                    <div className="mt-10 flex flex-col gap-10">
                        <p className="font-extrabold text-2xl text-black">Product Description</p>
                        <p className="text-black text-md">{currProduct.description}</p>
                    </div>
                </div>
                <div className="col-span-2 py-10 flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-black hidden lg:block">{currProduct.name}</h1>
                    <p className="text-md font-light text-black hidden lg:block">{currProduct.manufacturer}</p>
                    <StarRating rating={currProduct.rating} />
                    {
                        currProduct.sale ? (
                            <div className="flex flex-row gap-5 mt-3">
                                <p className="text-4xl line-through text-black font-bold">${currProduct.price}</p>
                                <p className="text-4xl text-red-500 font-bold">${currProduct.saleprice}</p>
                            </div>
                        ) :
                            (
                                <p className="mt-3 text-4xl line-through text-black font-bold">${currProduct.price}</p>
                            )
                    }
                    <div className="mt-3 border-2 px-4 py-2 rounded-2xl border-gray-300 flex flex-col justify-center gap-1">
                        <p className="text-gray-500 text-sm">Platform</p>
                        <p className="text-black font-medium text-lg">{currProduct.platform}</p>
                    </div>
                    <button className="mt-6 bg-red-600 px-5 py-3 text-white font-bold rounded-lg hover:bg-red-700">Add To Cart</button>

                    {
                        currProduct.audience == "Mature" ? (
                            <div className="mt-6 flex flex-row gap-3 text-black items-center">
                                <div className="relative w-12 h-20">
                                    <Image fill={true} alt="esrb" src={"/images/m-rating.png"}></Image>
                                </div>
                                <p className="text-lg font-bold">ESRB Rating:</p>
                                <p className="text-lg">{'M (Mature)'}</p>
                            </div>

                        ) : currProduct.audience == "Everyone" ? (
                            <div className="mt-6 flex flex-row gap-3 text-black items-center">
                                <div className="relative w-12 h-20">
                                    <Image fill={true} alt="esrb" src={"/images/e-rating.png"}></Image>
                                </div>
                                <p className="text-lg font-bold">ESRB Rating:</p>
                                <p className="text-lg">{'E (Everyone)'}</p>
                            </div>
                        ) : (
                            <div className="mt-6 flex flex-row gap-3 text-black items-center">
                                <div className="relative w-12 h-20">
                                    <Image fill={true} alt="esrb" src={"/images/m-rating.png"}></Image>
                                </div>
                                <p className="text-lg font-bold">ESRB Rating:</p>
                                <p className="text-lg">{'T (Teen 13+)'}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Product