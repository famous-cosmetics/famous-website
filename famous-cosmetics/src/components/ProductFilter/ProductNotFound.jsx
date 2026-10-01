import React from "react";

export default function ProductNotFound() {
    return (
        <div className=" col-span-full! !w-full !m-0 !p-0">
            <div className=" flex min-h-[250px] !w-full
                flex-col items-center justify-center gap-4
                !m-0 !p-4 text-center">

                <img
                    className="object-contain"
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="Product Not Found"
                />

                <h3 className="!m-0 !p-0 text-base font-semibold text-gray-600 sm:text-lg">
                    কোনো পণ্য পাওয়া যায়নি
                </h3>

            </div>
        </div>
    );
}