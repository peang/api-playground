import React, { Component } from "react";
import SidebarEndpoints from './SidebarEndpoints';

export default class SidebarList extends Component {
    constructor(props) {
        super(props)
    }

    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    render() {
        let data = this.props.data;
        let endpoints = data.endpoints;

        return (
            <li className="nav-item nav-dropdown">
                <a className="nav-link nav-dropdown-toggle" href="#"
                    onClick={this.handleClick.bind(this)}>
                    {data._id}
                </a>
                <ul className="nav-dropdown-items">
                    {endpoints.map((endpoint, index) => {
                        return (
                            <SidebarEndpoints key={endpoint.path + '-' + endpoint.method}
                                name={data._id}
                                version={data.version}
                                title={endpoint.title}
                                path={endpoint.path}
                                method={endpoint.method}
                            />
                        )
                    })}
                </ul>
            </li>
        );
    }
}