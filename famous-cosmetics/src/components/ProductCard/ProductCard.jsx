import React from 'react'
import './productCard.css'
import defaultImage from '../../assets/images/default-image.jpg'

export default function ProductCard({ product }) {
    const { name, brand, image, purchasePrice, expiredDate, wholesalePrice, stock, retailPrice } = product;



    return (
        <div className="product-card shadow bg-white !p-3 rounded">
            <div
                className={`product-header ${stock <= 0 ? "stock-out" : ""
                    } ${stock <= 10 ? "low-stock" : ""
                    } mx-auto flex justify-center w-full`}
            >
                {image ? (
                    <img
                        className="w-full! h-auto object-cover block"
                        src={image}
                        alt={name}
                    />
                ) : (
                    <img
                        className="w-full! h-auto object-covere block"
                        src={defaultImage}
                        alt="photo"
                    />
                )}
            </div>
            <div className="product-body flex flex-col !gap-[2px] !pt-2 text-left !my-2">
                <div className="!ml-1">
                    <h5 className='text-md'>নাম: {name}</h5>
                    <p>ব্র্যান্ড : {brand}</p>
                </div>
                <div className=" gap-2 leading-7">

                    <p className='text-red-600'>ক্রয়মূল্য: {purchasePrice}Tk </p>
                    <p>পাইকারি মূল্য: {wholesalePrice}Tk</p>
                    <p>স্টক: {stock} পিচ</p>
                    {
                        expiredDate ? <p>
                            মেয়াদ: {expiredDate.split("-").reverse().join("/")}
                        </p> : " "
                    }
                    <p className='text-green-600 font-semibold'>খুচরা মূল্য: {retailPrice} টাকা</p>
                </div>
            </div>
        </div>
    )
}
