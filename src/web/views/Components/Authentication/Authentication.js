import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import AuthenticationForm from "./AuthenticationForm";
import AuthenticationJwtForm from "./AuthenticationJwtForm";
import RequestResultCard from "./../RequestResultCard";

class Authentication extends Component {
    contentToggle(e) {
        document.getElementById('auth-header-body').classList.toggle('hide-content');
    }

    componentWillMount()
    {
        console.log(typeof(Storage));
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Col xs={12}>
                    <div className="card">
                        <div className="card-header">
                            Authentication
                            <label className="switch switch-default switch-info-outline-alt switch-sm float-right">
                                <input type="checkbox" className="switch-input" onClick={this.contentToggle} />
                                <span className="switch-label"></span>
                                <span className="switch-handle"></span>
                            </label>
                        </div>
                        <Row className="card-block sidebar-hidden hide-content" id="auth-header-body">
                            <Col sm={12} md={6}>
                                <AuthenticationForm />
                            </Col>

                            <Col sm={12} md={6}>
                                <RequestResultCard
                                    badge={this.props.authResult.badge}
                                    request_time={this.props.authResult.request_time}
                                    code={this.props.authResult.code}
                                    body={this.props.authResult.body}
                                />
                            </Col>

                            <Col md={12}>
                                <AuthenticationJwtForm />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        authResult: state.authentication
    });
}

export default connect(mapStateToProps)(Authentication)