import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from './routes.js';
import { Header } from "./cmps/Header.jsx";
import { Component } from 'react';


class _App extends Component {
    state = {
    }

    render() {

        return (
            <div>
                <Router>
                    <Header>
                    </Header>
                    <main>
                    <Switch>
                        {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
                    </Switch>
                    </main>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

const mapDispatchToProps = {

}


export const App = connect(mapStateToProps, mapDispatchToProps)(_App);


