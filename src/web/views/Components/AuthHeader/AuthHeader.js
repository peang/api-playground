import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import {connect} from "react-redux";
import AuthHeaderForm from "./AuthHeaderForm";
import AuthHeaderJwtForm from './AuthHeaderJwtForm';
import RequestResultCard from './../RequestResultCard';

class AuthHeader extends Component {
    render() {
        const theme = {
            scheme: 'bright',
            author: 'chris kempson (http://chriskempson.com)',
            base00: '#000000',
            base01: '#303030',
            base02: '#505050',
            base03: '#b0b0b0',
            base04: '#d0d0d0',
            base05: '#e0e0e0',
            base06: '#f5f5f5',
            base07: '#ffffff',
            base08: '#fb0120',
            base09: '#fc6d24',
            base0A: '#fda331',
            base0B: '#a1c659',
            base0C: '#76c7b7',
            base0D: '#6fb3d2',
            base0E: '#d381c3',
            base0F: '#be643c'
        };

        return (
            <div className="animated fadeIn">
                <Col xs={12}>
                    <div className="card">
                        <div className="card-header">
                            JWT Header
                            <label className="switch switch-sm switch-text switch-info float-right mb-0">
                                <input type="checkbox" className="switch-input" onClick={this.toggleHeaderDisplay}/>
                                <span className="switch-label" data-on="On" data-off="Off"></span>
                                <span className="switch-handle"></span>
                            </label>
                        </div>
                        <Row className="card-block" id="auth-header-body">
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