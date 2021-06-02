
import { Link } from 'react-router-dom';
import React from 'react';


export function BoardPreview({ board }) {
    const { _id, title, style } = board;

    return (

        <Link to={`/board/${_id}`}>
            <div className="single-board-preview" style={{ backgroundColor: style.bgc }}>
                <h4>{title}</h4>
            </div>
        </Link>

    );

}

