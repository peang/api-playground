import React, {Component} from 'react';
import {Dropdown, DropdownMenu, DropdownItem} from 'reactstrap';

class Header extends Component {

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

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    render() {
        return (
            <header className="app-header navbar">
                <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up"
                        onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
                <a className="navbar-brand" href="#"></a>
                <ul className="nav navbar-nav hidden-md-down">
                    <li className="nav-item">
                        <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle}
                           href="#">&#9776;</a>
                    </li>

                </ul>
            </header>
        )
    }
}

export default Header;
