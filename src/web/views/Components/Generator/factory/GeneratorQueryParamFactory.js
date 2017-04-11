import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';
import {Field, change} from 'redux-form';

class GeneratorQueryParamFactory extends Component {
    constructor(props) {
        super(props);

        this.addQueryParam = this.addQueryParam.bind(this);
        // this.deleteQueryParam = this.deleteQueryParam.bind(this);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={11}>
                        <strong><p>Query Params</p></strong>
                    </Col>
                    <Col md={1} className="vertical-center">
                        <button type="button" className="btn btn-sm btn-success pull-right"
                                data-balloon="Add Query Param" data-balloon-pos="up"
                                onClick={this.addQueryParam}
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
                                    <Field name={"qparamKey_" + data} className="form-control" component="input" type="text"
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
                                        onClick={this.deleteQueryParam.bind(this)}
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

    addQueryParam() {
        this.props.dispatch({
            type: 'generator_query_param.add'
        });
    }

    deleteQueryParam(event) {
        const id = event.currentTarget.dataset.id;
        const index = event.currentTarget.dataset.index;

        this.props.dispatch(change('api_client', 'qparamKey_' + id, ''));
        this.props.dispatch(change('api_client', 'qparamValue_' + id, ''));

        this.props.dispatch({
            type: 'generator_query_param.delete',
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
export default connect(mapStateToProps)(GeneratorQueryParamFactory);