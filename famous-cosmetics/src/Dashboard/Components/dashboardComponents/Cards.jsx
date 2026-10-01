import React from 'react'

export default function Cards(props) {
    return (
        <div className='dashboard-card'>
            <div className="card-title">
                <h5>{props.title}</h5>
            </div>
            <div className="card-body">
                <span>{props.value}</span>
            </div>
        </div>
    )
}
