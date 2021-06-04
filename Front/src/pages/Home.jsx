import { Link } from 'react-router-dom';
import React from 'react';


export function Home() {
    return (
        <main className="home-page">
            <section className="homepage">
                <div className="homepage-header">
                    <h1>WePlan</h1>
                    <h2 className="st-header">Task Managment,</h2>
                    <h2>The Easy Way.</h2>
                    <Link className="home-link flex align-center justify-center " to="/board">Check our boards</Link>,
            </div>
                <div className="homepage-img">
                </div>
            </section>
            <footer className="flex align-center justify-center">
                <p>® 2021 WePlan | Shirly Seggev | Linoy Fakiro | Gal Nelken</p>
            </footer>
        </main>
    )
}

