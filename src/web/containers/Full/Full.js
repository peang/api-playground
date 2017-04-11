import React, {Component} from "react";
import Header from "../../components/Header/";
import Sidebar from "../../components/Sidebar/";
import Aside from "../../components/Aside/";

import Breadcrumbs from "react-breadcrumbs";

export default class Full extends Component {
    render() {

        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar />
                    <main className="main">
                        <Breadcrumbs
                            wrapperElement="ol"
                            wrapperClass="breadcrumb"
                            itemClass="breadcrumb-item"
                            separator=""
                            routes={this.props.routes}
                            params={this.props.params}
                        />
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </main>
                    <Aside />
                </div>
            </div>
        );
    }
}