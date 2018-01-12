import axios from 'axios';
import {change} from 'redux-form';

export default (data, props) => {
    props.dispatch({
        type: 'authHeader.requestJWT',
        data: data
    })

    var start_time = new Date().getTime();
    axios.post('/api/request-access-token', data)
        .then((res) => {
            let jwt_token = res.data.token;
            let request_time = new Date().getTime() - start_time;

            props.dispatch({
                type: 'authHeader.requestJWT_success',
                body: res.data,
                code: 200,
                badge: 'success',
                jwt_token: jwt_token,
                request_time: request_time
            });

            props.dispatch(change('auth_header', 'jwt_token', jwt_token));
        })
        .catch((err) => {
            let request_time = new Date().getTime() - start_time;

            if (!err.response) {
                props.dispatch({
                    type: 'authHeader.requestJWT_error',
                    body: '',
                    code: 500,
                    badge: 'danger',
                    request_time: request_time
                })
            }

            let badge
            if (err.response.status >= 500) {
                badge = 'danger'
            } else {
                badge = 'warning'
            }

            props.dispatch({
                type: 'authHeader.requestJWT_error',
                body: err.response.data.body,
                code: err.response.status,
                badge: badge,
                request_time: request_time
            })
        })
}