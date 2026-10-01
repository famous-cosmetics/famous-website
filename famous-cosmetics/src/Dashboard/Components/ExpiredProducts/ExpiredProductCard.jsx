import React from 'react'

export default function ExpiredProductCard({ data }) {
    return (
        <div className='expired-card !p-3 rounded shadow'>
            <div className="image">
                <img className='' src={data.image} alt={data.name} />
            </div>
            <div className="expired-body !mt-3">
                <p>Name: {data.name}</p>
                <p className='text-red-600 font-semibold'>Expired date: {data?.expiredDate.split("-").reverse().join("-")}</p>
                <p>Brand: {data.brand}</p>
            </div>
            {/* <div className="expired-footer !my-2">
                <button className='bg-red-700 text-white cursor-pointer w-[100%] rounded h-[40px] '>Delete</button>
            </div> */}
        </div>
    )
}
