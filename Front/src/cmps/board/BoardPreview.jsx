
import { Link } from 'react-router-dom';
import React from 'react';


export function BoardPreview({ board }) {
    const { _id, title, style } = board;
    const bg = style.img ? { backgroundImage: `url(${style.img})` } : { backgroundColor: style.bgc };

    return (
        <Link to={`/board/${_id}`}>
            <div className="single-board-preview" style={bg}>
                <h4>{title}</h4>
            </div>
        </Link>

    );

}

