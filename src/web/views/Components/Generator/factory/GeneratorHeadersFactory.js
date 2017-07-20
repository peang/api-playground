import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {Field, change} from 'redux-form';

export class GeneratorHeadersFactory extends Component {
    constructor(props) {
        super(props);

        this.addHeader = this.addHeader.bind(this);
        // this.deleteHeader = this.deleteHeader.bind(this);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={11}>
                        <strong><p>Headers</p></strong>
                    </Col>
                    <Col md={1} className="vertical-center">
                        <button type="button" className="btn btn-sm btn-success pull-right"
                                data-balloon="Add Header" data-balloon-pos="up"
                                onClick={this.addHeader}
                        >
                            <i className="fa fa-plus"></i>
                        </button>
                    </Col>
                </Row>
                {this.props.generatorQueryParam.fieldParams.map((data, index) => {
                    return (
                        <Row key={data}>
                            <Col md={5}>
                                <div className="form-group form-query-param">
                                    <label htmlFor={data}></label>
                                    <Field name={"qparamKey_" + data} className="form-control" component="input"
                                           type="text"
                                           placeholder="Key"/>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group form-query-param">
                                    <label htmlFor={data}></label>
                                    <Field name={"qparamValue_" + data} className="form-control" component="input"
                                           type="text"
                                           placeholder="Value"/>
                                </div>
                            </Col>
                            <Col md={1} className="vertical-center">
                                <button type="button" className="btn btn-sm btn-danger pull-right"
                                        data-id={data}
                                        data-index={data.index}
                                        onClick={this.deleteHeader.bind(this)}
                                >
                                    <i className="fa fa-minus"></i>
                                </button>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        )
    }

    addHeader() {
        this.props.dispatch({
            type: 'generator_header.add'
        });
    }

    deleteHeader(event) {
        const id = event.currentTarget.dataset.id;
        const index = event.currentTarget.dataset.index;

        this.props.dispatch(change('api_client', 'headerKey_' + id, ''));
        this.props.dispatch(change('api_client', 'headerValue_' + id, ''));

        this.props.dispatch({
            type: 'generator_header.delete',
            id: id,
            index: index
        });
    }
}

function mapStateToProps(state) {
    return {
        generatorQueryParam: state.generator_query_param_form
    }
}
export default connect(mapStateToProps)(GeneratorHeadersFactory);