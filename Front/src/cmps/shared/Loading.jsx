import React from "react";
import Loader from "react-loader-spinner";

export function Loading() {
    return (
        <div className="loader">
            <Loader type="Bars" color="#ebecf0" height="80" width="80" />
        </div>
    )
}

