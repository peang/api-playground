export default (data, props) => {
    props.dispatch({
        type: 'generator.request_field_data',
        data: data
    })

    axios.post('/api/request-access-token', data)
        .then((res) => {
            props.dispatch({
                type: 'authHeader.requestJWT_success',
                body: res.data,
                code: 200,
                badge: 'success',
            })
        })
        .catch((err) => {
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
                badge: badge
            })
        })
}