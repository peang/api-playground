import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import jwtFormSubmit from "./fetchData/jwtFormSubmit";

class AuthenticationForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Render form
     * @returns {XML}
     */
    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props
        return (
            <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field name="username" className="form-control" component="input" type="text"
                           placeholder="Enter Username"/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" className="form-control" component="input" type="password"
                           placeholder="Enter Password"/>
                </div>
                <div>
                    <button type="submit" className="btn btn-md btn-info" disabled={submitting}
                            style={{marginRight: 5 + 'px'}}><i className="fa fa-dot-circle-o"></i> Submit
                    </button>
                    <button type="reset" className="btn btn-md btn-danger" disabled={submitting}
                            onClick={reset}><i className="fa fa-ban"></i> Reset
                    </button>
                </div>
            </form>
        )
    }

    handleSubmit(data) {
        jwtFormSubmit(data, this.props);
    }
}

AuthenticationForm = reduxForm({
    form: 'auth_header'
})(AuthenticationForm)

AuthenticationForm = connect((state) =>({
    auth_header_jwt: state.form.auth_header_jwt,
}))(AuthenticationForm);

export default AuthenticationForm
