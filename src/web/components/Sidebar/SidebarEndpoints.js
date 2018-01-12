import React, { Component } from 'react';
import { Link } from 'react-router';
import slugify from 'slugify';

export default class SidebarEndpoints extends Component {
    render() {
        let methodSpanColor;

        let path = this.props.path;
        let title = this.props.title;
        let version = this.props.version;
        let method = this.props.method;
        let service_name = slugify(this.props.name.toLowerCase());

        let firstMethod = method[0];
        
        switch (firstMethod) {
            case 'POST':
                methodSpanColor = 'info';
                break;
            case 'GET':
                methodSpanColor = 'success';
                break;
            case 'UPDATE':
                methodSpanColor = 'warning';
                break;
            case 'DELETE':
                methodSpanColor = 'danger';
                break;
            default:
                methodSpanColor = 'info';
                break;
        }

        return (
            <li className="nav-item nav-endpoints">
                <Link to={{
                    pathname: '/play', query: {
                        service: service_name,
                        version: version,
                        path: path,
                        method: method,
                        title: title
                    }
                }}
                    className="nav-link" activeClassName="active">
                    <span className={`badge badge-${methodSpanColor} float-left`} style={{marginRight: 5 + 'px', width: 40 + 'px'}}>{method} </span> {title}
                </Link>
            </li>
        )
    }
}