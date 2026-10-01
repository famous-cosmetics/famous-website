import React, { useEffect, useState } from 'react'
import { useProducts } from '../../ProductContext/ProductsContext';
import ExpiredProductCard from './ExpiredProductCard';
import Pagination from '../../../components/pagination/Pagination';
import ProductNotFound from '../../../components/ProductFilter/ProductNotFound';

export default function ExpierdProduct() {

    const { products, loading } = useProducts();
    const [currentProducts, setCurrentProducts] = useState([]);

    const [expiringProducts, setExpiringProducts] = useState([]);


    useEffect(() => {
        const today = new Date();

        const faourMonthLater = new Date();
        faourMonthLater.setMonth(faourMonthLater.getMonth() + 4);

        const result = products.filter((product) => {
            const expiryDate = new Date(product.expiredDate);

            return expiryDate >= today && expiryDate <= faourMonthLater;
        });

        setExpiringProducts(result);
    }, [products]);



    return (
        <div className='expired-products-page'>
            <h3 className='text-[22px] sm:text-[16px] md:text-[22px] lg:text-[28px] text-2xl !py-3 text-center'>মেয়াদোত্তীর্ণ হতে যাওয়া পণ্যের তালিকা </h3>

            <div className="products-content-body">
                <div className="title h-[100px] bg-gray-200 !my-5 rounded flex items-center !px-5">
                    <h3 className='text-[16px]! sm:text-[16px]! md:text-[22px] lg:text-[26px]! text-xl! flex items-center'>মেয়াদ শেষ হতে চলেছে : <span className='text-[20px] md:text-[26px] lg:text-[32px] xl:text-[36px]  text-red-800 font-semibold'>{expiringProducts.length} </span> টি</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 !py-10">
                    {expiringProducts.length > 0 ?
                        expiringProducts.map((items, i) => {
                            return (
                                <ExpiredProductCard data={items} key={i} />
                            )
                        }) : <div className="col-span-full !w-full !m-0 !p-0">
                            <ProductNotFound />
                        </div>
                    }
                </div>
                {/* Pagination */}
                <div className="pagination-div">
                    <Pagination
                        products={expiringProducts}
                        setCurrentProducts={setCurrentProducts}
                        productsPerPage={20}
                    />
                </div>
            </div>
        </div>
    )
}
