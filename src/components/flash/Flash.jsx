import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify';

export default class Flash extends Component {
    render() {
        return (
            <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover={false}
            />
        )
    }
}