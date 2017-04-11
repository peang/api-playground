import React, {Component} from "react";
import {Field} from "redux-form";
import {connect} from "react-redux";
import {v4 as uuidV4} from "uuid";

class GeneratorFormFactory extends Component {
    symfonyFieldGenerator(fieldType) {
        let options = [];

        switch (fieldType) {
            case "text":
            case "search":
            case "repeated":
            case "hidden":
            case "radio":
                options = [
                    "text",
                    `${fieldType} input`,
                    "input"
                ];
                break;
            case "url":
                options = [
                    "text",
                    `${fieldType} input : http://sidebeep.com, sidebeep.com`,
                    "input"
                ];
                break;
            case "choice":
                options = [
                    "text",
                    `${fieldType} input`,
                    "input"
                ];
                break;

            case "range":
            case "number":
            case "percent":
            case "integer":
            case "money":
                options = [
                    "number",
                    `${fieldType} input`,
                    "input"
                ];
                break;

            case "country":
                options = [
                    "text",
                    `${fieldType} input : ID, EN`,
                    "input"
                ];
                break;
            case "language":
                options = [
                    "text",
                    `${fieldType} input : en, id, fr`,
                    "input"
                ];
                break;
            case "locale":
                options = [
                    "text",
                    `${fieldType} input : fr, fr_FR`,
                    "input"
                ];
                break;
            case "timezone":
                options = [
                    "text",
                    `${fieldType} input : America/Chicago, Europe/Istanbul`,
                    "input"
                ];
                break;
            case "currency":
                options = [
                    "text",
                    `${fieldType} input : USD, IDR`,
                    "input"
                ];
                break;

            case "collection":
                options = [
                    "",
                    `${fieldType} input : [{object1}, {object2}] / ["str1", "str2"]`,
                    "textarea"
                ];
                break;

            case "form":
            case "object":
                options = [
                    "",
                    `${fieldType} input : {object: []}`,
                    "textarea"
                ];
                break;
            case "textarea":
                options = [
                    "",
                    `${fieldType} input`,
                    "textarea"
                ];
                break;
            case "email":
                options = [
                    "email",
                    `${fieldType} input`,
                    "input"
                ];
                break;
            case "password":
                options = [
                    "password",
                    `${fieldType} input`,
                    "input"
                ];
                break;
            case "date":
            case "birthday":
                options = [
                    "text",
                    `${fieldType} input: yyyy-mm-dd`,
                    "input"
                ];
                break;

            case "datetime":
                options = [
                    "text",
                    `${fieldType} input: 2021-11-25T09:19:24+0000`,
                    "input"
                ];
                break;
            case "time":
                options = [
                    "text",
                    `${fieldType} input: H:m, 12:00`,
                    "input"
                ];
                break;
            case "bool":
            case "checkbox":
                options = [
                    "text",
                    `${fieldType} input: true, false`,
                    "input"
                ];
                break;
            case "file":
                options = [
                    "file",
                    `${fieldType} input`,
                    "input"
                ];
                break;

            default:
                options = [
                    "text",
                    `${fieldType} input`,
                    "input"
                ]
        }

        return options;
    }

    render() {
        let fields = this.props.generatorForm.bodyParams ? this.props.generatorForm.bodyParams : [];

        return (
            <div>
                <strong><p>Body Params</p></strong>
                {fields.map((field, index) => {
                    let normalizedName = field.name.replace(/_/g, ' ').replace(/\b[a-z]/g, function (letter) {
                        return letter.toUpperCase();
                    });

                    let requiredClass = field.required ? 'required' : '';
                    let [type, placeholderAlternative, component] = this.symfonyFieldGenerator(field.type);
                    let placeholder = field.default_value ? field.default_value : placeholderAlternative;

                    if (field.description === null || field.description === '') {
                        return (
                            <div className={`form-group`} key={uuidV4()}>
                                <label htmlFor={field.name} className={requiredClass}>{normalizedName}</label>
                                <Field name={`bodyParam_${field.name}`}
                                       component={component}
                                       type={type}
                                       className="form-control"
                                       placeholder={placeholder}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div className={`form-group`} key={uuidV4()}>
                                <label htmlFor={field.name} className={requiredClass}>{normalizedName}</label>
                                <span className="float-right"
                                      data-balloon={field.description}
                                      data-balloon-pos="up"
                                      data-balloon-length="medium">
                                <i className="fa fa-info-circle"></i>
                                </span>
                                <Field name={`bodyParam_${field.name}`}
                                       component={component}
                                       type={type}
                                       className="form-control"
                                       placeholder={placeholder}
                                />
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        generatorForm: state.generator_form
    }
}
export default connect(mapStateToProps)(GeneratorFormFactory);