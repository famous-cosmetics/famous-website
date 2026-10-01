const { default: API_URL } = require("../../../config/apiConfig");

const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
        name: "Face Wash",
        brand: "Garnier",
        category: "Skincare",
        weight: "100ml",
        stock: 50,
        price: 250,
        wholesalePrice: 200,
        retailPrice: 250,
        image: "https://example.com/image.jpg",
    };

    const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    const data = await response.json();

};