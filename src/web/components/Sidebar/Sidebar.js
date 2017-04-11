import React from "react";
import {connect} from "react-redux";
import SidebarList from "./SidebarList";
import slugify from 'slugify';
import fetchServiceData from './fetchData/fetchServiceData';


class Sidebar extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentWillMount()
    {
        fetchServiceData(this.props);
    }

    render() {
        return (
            <div>
                <div className="sidebar">
                    <nav className="sidebar-nav">
                        <ul className="nav">
                            {this.props.sidebar_component.map((data, index) => {
                                return(<SidebarList key={slugify(data._id)} data={data} />)
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        sidebar_component: state.sidebar.sidebar_component
    });
}

export default connect(mapStateToProps) (Sidebar)