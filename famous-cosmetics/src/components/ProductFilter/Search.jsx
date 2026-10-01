import React, { useState } from 'react'

export default function SearchBar({ handleSearch, search }) {




    return (
        <div className="search-bar">
            <input
                type="text"
                className="form-control bg-white text-black"
                placeholder="Search product, brand or category..."
                value={search}
                onChange={handleSearch}
            />
        </div>
    )
}
