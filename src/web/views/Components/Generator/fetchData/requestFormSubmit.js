import axios from 'axios';

export default (data, props) => {
    props.dispatch({
        type: 'generator_request.request'
    })

    var startTime = new Date().getTime();
    axios.post('/api/request-client', data)
        .then((res) => {
            let requestTime = new Date().getTime() - startTime;
            props.dispatch({
                type: 'generator_request.request_success',
                body: res.data,
                code: 200,
                badge: 'success',
                request_time: requestTime
            })
        })
        .catch((err) => {
            let badge;
            if (err.response.status >= 500) {
                badge = 'danger'
            } else {
                badge = 'warning'
            }
            let requestTime = new Date().getTime() - startTime;

            props.dispatch({
                type: 'generator_request.request_error',
                body: err.response.data.body,
                code: err.response.status,
                badge: badge,
                request_time: requestTime
            })
        })
}