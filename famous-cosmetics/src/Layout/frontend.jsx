import React from 'react'
import NavBar from '../components/nav/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

export default function Frontend() {
    return (
        <div>
            <NavBar />
            <div className="App-container">
                <Outlet />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}
