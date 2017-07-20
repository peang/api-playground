import React, {Component} from "react";
import {connect} from "react-redux";
import GeneratorFormFactory from "./factory/GeneratorFormFactory";
import GeneratorQueryParamFactory from "./factory/GeneratorQueryParamFactory";
import GeneratorUrlParamFormFactory from "./factory/GeneratorUrlParamFormFactory";
import requestFormSubmit from "./fetchData/requestFormSubmit";
import {reduxForm, formValueSelector} from "redux-form";
import {GeneratorHeadersFactory} from "./factory/GeneratorHeadersFactory";

class GeneratorForms extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Populate endpoint to save it to store
     */
    populateEndpoint() {
        let endpoint = {};

        this.props.sidebar.sidebar_component.map((data, index) => {
            if (data.slug === this.props.generatorBody.data.service) {
                let endpoints = data.endpoints;
                endpoints.map((endpointData, index) => {
                    if (endpointData.path === this.props.generatorBody.data.path) {
                        if (endpointData.method.includes(this.props.generatorBody.data.method)) {
                            endpoint = endpointData;

                            let pathSplitted = endpoint.path.split('/');
                            let pathResult = pathSplitted.map((route, index) => {
                                let pattern = /{/i;
                                if (pattern.test(route)) {
                                    let normalized = route.replace('{', '').replace('}', '');

                                    return normalized;
                                }
                            });

                            this.props.dispatch({
                                type: 'generator_form.has_endpoint',
                                endpoint: endpoint,
                                urlParams: pathResult.filter((n) => {
                                    return n !== undefined
                                }),
                                bodyParams: endpoint.fields
                            })
                        }
                    }
                })
            }
        });
    }

    componentDidUpdate() {
        if (this.props.sidebar.state === 'done') {
            this.populateEndpoint();
        }
    }

    componentDidMount() {
        if (this.props.sidebar.state === 'done') {
            this.populateEndpoint();
        }
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, jwtToken} = this.props;
        return (
            <div>
                <div className="form-group row">
                    <label className="col-md-3 form-control-label">
                        Path
                    </label>
                    <div className="col-md-9">
                        <p className="form-control-static"><strong>{this.props.generatorBody.data.path}</strong></p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <GeneratorQueryParamFactory />
                    {/*<hr />*/}
                    {/*<GeneratorHeadersFactory />*/}
                    <hr />
                    <strong><p>URL Params</p></strong>
                    <GeneratorUrlParamFormFactory />
                    <hr />
                    <GeneratorFormFactory />
                    <div>
                        <button type="submit" className="btn btn-md btn-info" disabled={submitting}
                                style={{marginRight: 5 + 'px'}}><i className="fa fa-dot-circle-o"></i> Submit
                        </button>
                        <button type="reset" className="btn btn-md btn-danger" disabled={submitting}
                                onClick={reset}><i className="fa fa-ban"></i> Reset
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit(data) {
        let queryParam = '';
        let path = this.props.generatorForm.endpoint.path;
        let newPath = path;

        let newData = JSON.parse(JSON.stringify(data));
        let keys = Object.keys(newData);

        // filter url Param
        keys.map((key, index) => {
            let pattern = /urlParam/i;
            if (pattern.test(key)) {
                let newParam = key.replace(/urlParam/i, '');
                let regex = new RegExp(newParam, "i");
                newPath = newPath.replace(regex, data[key]);

                delete newData[key];
            }
        });

        // filter query param
        keys.map((key, index) => {
            let pattern = /qparamKey_/g;
            if (pattern.test(key)) {
                let id = key.substring(10, 47);

                let keyParam = newData[`qparamKey_${id}`] == undefined ? null : newData[`qparamKey_${id}`];
                let valueParam = newData[`qparamValue_${id}`] == undefined ? '' : newData[`qparamValue_${id}`];

                if (keyParam !== null) {
                    queryParam += `&${keyParam}=${valueParam}`;
                }

                delete newData[key];
            }
        });

        // normalize body param
        keys.map((key, index) => {
            let pattern = /bodyParam_/g;
            if (pattern.test(key)) {
                try {
                    let newParam = key.replace(/bodyParam_/g, '');
                    newData[newParam] = JSON.parse(newData[key]);
                    delete newData[key];
                } catch(err) {
                    let newParam = key.replace(/bodyParam_/g, '');
                    newData[newParam] = newData[key];
                    delete newData[key];
                }
            }
        });

        newData.url = newPath.replace(/{/g, '').replace(/}/g, '') + '?' + encodeURI(queryParam);
        newData.jwt = this.props.jwtToken;
        newData.method = this.props.generatorForm.endpoint.method;

        requestFormSubmit(newData, this.props);
    }
}

GeneratorForms = reduxForm({
    form: 'api_client',
})(GeneratorForms)

const selector = formValueSelector('auth_header');
GeneratorForms = connect((state) => {
    const jwtToken = selector(state, 'jwt_token')
    return {
        generatorBody: state.generator_body,
        generatorForm: state.generator_form,
        sidebar: state.sidebar,
        jwtToken,
    }
})(GeneratorForms)

export default GeneratorForms;