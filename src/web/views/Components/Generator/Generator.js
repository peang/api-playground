import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHeader from './../AuthHeader';
import GeneratorBody from './GeneratorBody';
import {reset} from 'redux-form';

class Generator extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.props.dispatch(reset('api_client'));
        this.triggerChangeField(this.props);
    }

    componentWillMount() {
        this.props.dispatch(reset('api_client'));
        this.triggerChangeField(this.props);
    }

    triggerChangeField(props) {
        props.dispatch({
            type: 'generator_body.change_field',
            data: props.location.query
        })
    }

    render() {
        return (
            <div>
                <AuthHeader/>
                <GeneratorBody />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sidebar_component: state.sidebar.sidebar_component
    };
}

export default connect(mapStateToProps)(Generator)