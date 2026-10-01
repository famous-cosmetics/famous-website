import React from 'react'
import CosmeticsSection from '../components/cosmeticsSection/CosmeticsSection'
import AccessoriesSection from '../components/Accessories/AccessoriesSection'
import Hero from '../components/HeroSection/Hero'
import { useProducts } from '../components/DataShareContext/DataShareContext';

export default function HomePage() {
    const {
        products,
        loading,
        error
    } = useProducts();

    const AccessoriesProducts = products.filter(product => product.productCategory === 'Accessories')
    const CosmeticsProducts = products.filter(product => product.productCategory === 'Cosmetics')



    return (
        <div>
            {/* Static Component: API loading হলেও দেখাবে */}
            <Hero />

            {/* Cosmetics Section */}
            <section>
                {loading ? (
                    <h3>Loading Cosmetics...</h3>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <CosmeticsSection data={CosmeticsProducts} />
                )}
            </section>

            {/* Accessories Section */}
            <section>
                {loading ? (
                    <h3>Loading Accessories...</h3>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <AccessoriesSection data={AccessoriesProducts} />
                )}
            </section>
        </div>
    )
}
