import React, {Component} from "react";
import {Field} from "redux-form";
import {connect} from "react-redux";

class GeneratorUrlParamFormFactory extends Component {

    render() {
        return (
            <div>
                {this.props.generatorForm.urlParams.map((data, index) => {
                    let normalizedName = this.normalizeName(data);
                    return (
                        <div className="form-group" key={data}>
                            <label htmlFor={normalizedName}>{normalizedName}</label>
                            <Field name={"urlParam" + data} className="form-control" component="input" type="text"
                                   placeholder={"Enter " + normalizedName}/>
                        </div>
                    )
                })}
            </div>
        )
    }

    normalizeName(str) {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) {
                return str.toUpperCase();
            });
    }
}

function mapStateToProps(state) {
    return {
        generatorForm: state.generator_form
    }
}

export default connect(mapStateToProps)(GeneratorUrlParamFormFactory);