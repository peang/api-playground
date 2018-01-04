import React, {Component} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {Dropdown, DropdownMenu, DropdownItem, Progress} from 'reactstrap';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="col-sm-12">
                    <div className="card text-center">
                        <div className="card-block">
                            <blockquote className="card-blockquote">
                                <h1>Welcome to Bizzy API Explorer.</h1>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
