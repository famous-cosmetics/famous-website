import { useState } from "react";
import AllProductsData from "../../assets/Data/data";




function EasyFilter() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [catagorylist, setCatagoryList] = useState([]);
    const [totalFilter, setTotalFilter] = useState(0);

    if (totalFilter > 0) {

    }

    AllProductsData.map((item) => {
        if (!catagorylist.includes(item.category)) {
            return setCatagoryList([...catagorylist, item.category])
        }
    });

    function clearFilter() {
        alert("do you want to Clear the Filter?");
        setSelectedCategories([])
    }

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            // already selected হলে remove
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        } else {
            // selected না হলে add
            setSelectedCategories([
                ...selectedCategories,
                category
            ]);
        }
    };

    const filteredProducts =
        selectedCategories.length === 0
            ? AllProductsData
            : AllProductsData.filter((product) =>
                selectedCategories.includes(product.productCategory)
            );

    return (
        <div className="filter-page">

            {/* Filter */}
            <div className="easy-filter-sidebar">
                {catagorylist.map((category) => (

                    <label key={category}>
                        <input
                            type="checkbox"
                            value={category}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                        />

                        {category}
                    </label>

                ))}

                <div className="clear-button">
                    <button onClick={clearFilter}>Clear</button>
                </div>
            </div>


            {/* Products */}
            <div className="products-display">
                <div className="item-found">
                    {
                        selectedCategories < 1 ? " " : <h5>Products Found: {selectedCategories < 1 ? "0" : filteredProducts.length} Item</h5>

                    }
                </div>

                <div className='Cosmetics-products'>
                    {
                        filteredProducts.map((item, i) => {
                            return <div className='product-card' title={item.name} key={i}>
                                <div className="card-header">
                                    <img src={item.photo} alt={item.name} />
                                    <h4>{item.name}</h4>
                                </div>
                                <div className="card-body">
                                    <h5>{item.brand}</h5>
                                    <span>
                                        <ul>
                                            <li>Instock: {item.inStock} Pcs</li>
                                            <li>Wholesale Price: {item.wholesalePrice} Tk</li>
                                            <li>Price: {item.retailPrice} Tk</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>
                        })
                    }
                </div>


            </div>

        </div>
    );
}

export default EasyFilter;


















// import React, { useMemo, useState } from "react";

// const ProductFilter = ({ products = [] }) => {
//     const [search, setSearch] = useState("");
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     // Products থেকে automatically সব category বের করবে
//     const categories = useMemo(() => {
//         return [...new Set(products.map((product) => product.productCategory))];
//     }, [products]);

//     // Category checkbox handle
//     const handleCategoryChange = (category) => {
//         setSelectedCategories((prev) => {
//             // আগে selected থাকলে remove করবে
//             if (prev.includes(category)) {
//                 return prev.filter((item) => item !== category);
//             }

//             // নতুন category সবশেষে add করবে
//             return [...prev, category];
//         });
//     };

//     // Search + Category filter + Last checked category priority
//     const filteredProducts = useMemo(() => {
//         const searchText = search.toLowerCase().trim();

//         let result = products.filter((product) => {
//             // Search check
//             const matchesSearch =
//                 product.name?.toLowerCase().includes(searchText) ||
//                 product.brand?.toLowerCase().includes(searchText) ||
//                 product.productCategory?.toLowerCase().includes(searchText);

//             // Category check
//             const matchesCategory =
//                 selectedCategories.length === 0 ||
//                 selectedCategories.includes(product.productCategory);

//             return matchesSearch && matchesCategory;
//         });

//         // সর্বশেষ checked category
//         const lastSelectedCategory =
//             selectedCategories[selectedCategories.length - 1];

//         if (lastSelectedCategory) {
//             result.sort((a, b) => {
//                 const aMatch =
//                     a.productCategory === lastSelectedCategory;

//                 const bMatch =
//                     b.productCategory === lastSelectedCategory;

//                 if (aMatch && !bMatch) return -1;
//                 if (!aMatch && bMatch) return 1;

//                 return 0;
//             });
//         }

//         return result;
//     }, [products, search, selectedCategories]);

//     return (
//         <div className="container py-4">

//             {/* ================= SEARCH ================= */}
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search product, brand or category..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </div>


//             {/* ================= CATEGORY ================= */}
//             <div className="mb-4">

//                 <h5 className="mb-3">
//                     Categories
//                 </h5>

//                 <div className="d-flex flex-wrap gap-3">

//                     {categories.map((category) => (
//                         <label
//                             key={category}
//                             className="d-flex align-items-center gap-2"
//                             style={{ cursor: "pointer" }}
//                         >

//                             <input
//                                 type="checkbox"
//                                 checked={selectedCategories.includes(category)}
//                                 onChange={() =>
//                                     handleCategoryChange(category)
//                                 }
//                             />

//                             <span>{category}</span>

//                         </label>
//                     ))}

//                 </div>
//             </div>


//             {/* ================= ACTIVE FILTER ================= */}
//             {selectedCategories.length > 0 && (
//                 <div className="mb-4">

//                     <small className="text-muted">
//                         Selected:
//                     </small>

//                     <div className="d-flex flex-wrap gap-2 mt-2">

//                         {selectedCategories.map((category, index) => (
//                             <span
//                                 key={category}
//                                 className="badge bg-primary"
//                             >
//                                 {category}

//                                 {index === selectedCategories.length - 1 && (
//                                     <span className="ms-1">
//                                         ← Latest
//                                     </span>
//                                 )}
//                             </span>
//                         ))}

//                     </div>
//                 </div>
//             )}


//             {/* ================= RESULT ================= */}
//             <div className="mb-3">

//                 <h5>
//                     Products
//                     <span className="text-muted ms-2">
//                         ({filteredProducts.length})
//                     </span>
//                 </h5>

//             </div>


//             {/* ================= PRODUCT GRID ================= */}
//             {filteredProducts.length > 0 ? (

//                 <div className="row g-3">

//                     {filteredProducts.map((product) => (

//                         <div
//                             className="col-6 col-md-4 col-lg-3"
//                             key={product.id}
//                         >

//                             <div className="card h-100">

//                                 <img
//                                     src={product.photo || product.img}
//                                     className="card-img-top"
//                                     alt={product.name}
//                                     style={{
//                                         height: "200px",
//                                         objectFit: "cover",
//                                     }}
//                                 />

//                                 <div className="card-body">

//                                     <h6 className="card-title">
//                                         {product.name}
//                                     </h6>

//                                     <p className="text-muted mb-1">
//                                         {product.brand}
//                                     </p>

//                                     <small className="badge bg-light text-dark">
//                                         {product.productCategory}
//                                     </small>

//                                     <h6 className="mt-3">
//                                         ৳ {product.retailPrice || product.price}
//                                     </h6>

//                                 </div>

//                             </div>

//                         </div>

//                     ))}

//                 </div>

//             ) : (

//                 <div className="text-center py-5">

//                     <h5>No Products Found</h5>

//                     <p className="text-muted">
//                         Try another search or category.
//                     </p>

//                 </div>

//             )}

//         </div>
//     );
// };

// export default ProductFilter;