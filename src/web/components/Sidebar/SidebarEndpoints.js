import React, {Component} from 'react';
import {Link} from 'react-router';
import slugify from 'slugify';

export default class SidebarEndpoints extends Component {
    render() {

        let path = this.props.path;
        let title = this.props.title;
        let version = this.props.version;
        let method = this.props.method;
        let service_name = slugify(this.props.name.toLowerCase());

        return (
            <li className="nav-item nav-endpoints">
                <Link to={{pathname: '/play', query: {
                    service: service_name,
                    version: version,
                    path: path,
                    method: method,
                    title: title
                }}}
                      className="nav-link" activeClassName="active">
                    <i className="fa fa-angle-double-right"></i> {title}
                </Link>
            </li>
        )
    }
}