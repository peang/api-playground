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
    changeViewMode(event) {
        let viewMode = event.target.getAttribute('data-view');

        this.props.dispatch({
            type: 'generator_view_mode.change',
            view: viewMode
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
                    <button className="btn btn-info btn-sm text float-right" key={methodName} style={{marginLeft: 2 + 'px'}}>
                        <span>{methodName}</span>
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
                                    data-balloon="Pretty"
                                    data-balloon-pos="up"
                                    data-view="pretty"
                                    onClick={this.changeViewMode}>
                                <i className="fa fa-list-alt" data-view="pretty"></i>
                            </button>

                            <button type="button"
                                    className="btn btn-sm btn-warning float-right"
                                    data-balloon="Raw"
                                    data-balloon-pos="up"
                                    data-view="raw"
                                    onClick={this.changeViewMode}>
                                <i className="fa fa-align-center" data-view="raw"></i>
                            </button>

                            <button type="button"
                                    className="btn btn-sm btn-success float-right"
                                    data-balloon="Preview"
                                    data-balloon-pos="up"
                                    data-view="preview"
                                    style={{marginLeft: 5 + 'px'}}
                                    onClick={this.changeViewMode}>
                                <i className="fa fa-tasks" data-view="preview"></i>
                            </button>
                            {this.props.generatorForm.data.title}
                            {this.renderMethodSpan()}
                        </div>
                        <Row className="card-block">
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