import React, {Component} from "react";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import GeneratorForms from './GeneratorForms';
import RequestResultCard from "./../RequestResultCard";

class GeneratorBody extends Component {
    /**
     * @param props
     */
    constructor(props) {
        super(props);

        this.changeViewMode = this.changeViewMode.bind(this);
    }

    /**
     * Trigger change view
     */
    changeViewMode()
    {
        this.props.dispatch({
            type: 'generator_view_mode.change'
        })
    }

    /**
     * Rendering span component for methods
     * @returns {XML}
     */
    renderMethodSpan() {
        let methods = this.props.generatorForm.data.method;
        let isArray = Array.isArray(methods)

        if (isArray) {
            return this.props.generatorForm.data.method.map((methodName, index) => {
                return (
                    <button className="btn btn-info btn-sm text float-right">
                        <span style={{marginRight: 2 + 'px'}}
                            key={methodName}>{methodName}
                          </span>
                    </button>
                )
            })
        } else {
            return (
            <button className="btn btn-info btn-sm text float-right">
                <span>{methods}</span>
            </button>
            )
        }
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="animated fadeIn">
                <Col xs={12}>
                    <div className="card">
                        <div className="card-header">
                            <button type="button"
                                    className="btn btn-sm btn-secondary float-right"
                                    style={{marginLeft: 2 + 'px'}}
                                    data-balloon="Change View Mode"
                                    data-balloon-pos="up"
                                    onClick={this.changeViewMode}
                                    >
                                <i className="icon-eye icons"></i> {this.props.generatorViewMode.mode.toUpperCase()}
                            </button>
                            {this.props.generatorForm.data.title}
                            {this.renderMethodSpan()}
                        </div>
                        <Row className="card-block" id="auth-header-body">
                            <Col sm={12} md={6}>
                                <GeneratorForms />
                            </Col>

                            <Col sm={12} md={6}>
                                <RequestResultCard
                                    badge={this.props.generatorRequest.badge}
                                    request_time={this.props.generatorRequest.request_time}
                                    code={this.props.generatorRequest.code}
                                    body={this.props.generatorRequest.body}
                                    mode={this.props.generatorViewMode.mode}
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </div>
        )
    }
}

GeneratorBody = connect((state) => {
    return {
        generatorRequest: state.generator_request,
        generatorForm: state.generator_body,
        generatorViewMode: state.generator_view_mode,
        sidebar: state.sidebar
    }
})(GeneratorBody)

export default GeneratorBody;