import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'

import Home from 'routes/Home';
import './App.scss'

class App extends React.Component {

    componentDidMount() {
        if (this.props.location.pathname === '/') {
            document.querySelector('html').classList.add('html__scroll--disable')
        } else {
            document.querySelector('html').classList.remove('html__scroll--disable')
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname === '/') {
            document.querySelector('html').classList.add('html__scroll--disable')
        } else {
            document.querySelector('html').classList.remove('html__scroll--disable')
        }
    }
    render() {
        return (
            <div className="body-wrapper">
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(props => <App {...props} />)