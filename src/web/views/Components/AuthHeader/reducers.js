export function authentication(state = {
                                   header: {},
                                   body: {},
                                   badge: 'success',
                                   code: 200,
                                   jwt_token: '',
                                   request_time: 0
                               }, action) {

    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'authHeader.requestJWT':
            new_state = {
                header: {},
                body: {state: 'Loading...'},
                badge: 'success',
                code: 200,
                jwt_token: '',
                request_time: 0
            }

            return new_state;

        case 'authHeader.requestJWT_success':
            new_state = {
                header: action.header,
                body: action.body,
                badge: action.badge,
                code: action.code,
                jwt_token: action.jwt_token,
                request_time: action.request_time
            }

            return new_state;

        case 'authHeader.requestJWT_error':
            new_state = {
                header: action.header,
                body: action.body,
                badge: action.badge,
                code: action.code,
                jwt_token: '',
                request_time: action.request_time
            }

            return new_state;

        default:
            return state;
    }
}
