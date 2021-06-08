import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Home extends Component {

    render() {
        return (
            <main className="home-page">
                <section className="homepage">
                    <div className="homepage-header flex column justify-center align-center">
                        <h1>WePlan<span className="smart">.</span></h1>
                        <h2 className="sec-header">Task Managment,</h2>
                        <h2 className="sec-header">The Smart Way.</h2>
                        <Link to="/board" class="button2">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Check our boards
                                </Link>
                    </div>
                    <div className="homepage-img">
                    </div>
                </section>

                <section className="features  ">
                </section>
                <footer className="flex align-center justify-center">
                    <p>® 2021 WePlan | Shirly Seggev | Linoy Fakiro | Gal Nelken</p>
                </footer>
            </main>
        )
    }
}
