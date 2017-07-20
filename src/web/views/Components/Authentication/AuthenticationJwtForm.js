import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

class AuthenticationJwtForm extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Render form
     * @returns {XML}
     */
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="jwt_access_token">JWT Access Token</label>
                    <Field name="jwt_token" className="form-control" component="input" type="text"
                           placeholder="Put your JWT Access Token Here"/>
                </div>
            </form>
        )
    }
}

AuthenticationJwtForm = reduxForm({
    form: 'auth_header'
})(AuthenticationJwtForm)

AuthenticationJwtForm = connect((state) => ({
    authResult: state.authentication,
    initialValues: {
        jwt_token: '',
    }
}))(AuthenticationJwtForm);

export default AuthenticationJwtForm;