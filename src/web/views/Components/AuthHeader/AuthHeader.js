import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import AuthHeaderForm from "./AuthHeaderForm";
import AuthHeaderJwtForm from './AuthHeaderJwtForm';
import RequestResultCard from './../RequestResultCard';

class AuthHeader extends Component {
    contentToggle(e) {
        document.getElementById('auth-header-body').classList.toggle('hide-content');
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Col xs={12}>
                    <div className="card">
                        <div className="card-header">
                            JWT Header
                            <label className="switch switch-sm switch-text switch-info float-right mb-0">
                                <input type="checkbox" className="switch-input" onClick={this.contentToggle} defaultChecked />
                                <span className="switch-label" data-on="On" data-off="Off"></span>
                                <span className="switch-handle"></span>
                            </label>
                        </div>
                        <Row className="card-block sidebar-hidden" id="auth-header-body">
                            <Col sm={12} md={6}>
                                <AuthHeaderForm />
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
                                <AuthHeaderJwtForm/>
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

export default connect(mapStateToProps)(AuthHeader)