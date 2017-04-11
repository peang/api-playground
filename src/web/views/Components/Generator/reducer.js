const uuidV4 = require('uuid/v4');

export function generatorBody(state = {
                                  data: {}
                              }, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'generator_body.change_field':
            new_state = {
                data: action.data
            }
            return new_state;

        default:
            return state;
    }
}

export function generatorForm(state = {
                                  endpoint: {},
                                  urlParams: [],
                                  bodyParams: []
                              }, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'generator_form.has_endpoint':
            new_state = {
                endpoint: action.endpoint,
                urlParams: action.urlParams,
                bodyParams: action.bodyParams
            }
            return new_state;

        default:
            return state;
    }
}

export function generatorRequest(state = {
                                     header: {},
                                     body: {},
                                     badge: 'success',
                                     code: 200,
                                     jwt_token: '',
                                     request_time: 0
                                 }, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'generator_request.request':
            new_state = {
                header: {},
                body: {state: 'Loading...'},
                badge: 'success',
                code: 200,
                jwt_token: '',
                request_time: 0
            }
            return new_state;

        case 'generator_request.request_success':
            new_state = {
                header: action.header,
                body: action.body,
                badge: action.badge,
                code: action.code,
                jwt_token: action.jwt_token,
                request_time: action.request_time
            }
            return new_state;

        case 'generator_request.request_error':
            new_state = {
                header: action.header,
                body: action.body,
                badge: action.badge,
                code: action.code,
                jwt_token: action.jwt_token,
                request_time: action.request_time
            }
            return new_state;
        default:
            return state;
    }
}

export function generatorQueryParamForm(state = {
                                            fieldParams: []
                                        }, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'generator_query_param.add':
            new_state.fieldParams.push(uuidV4())

            return new_state;

        case 'generator_query_param.delete':
            let index = new_state.fieldParams.indexOf(action.id);
            new_state.fieldParams.splice(index, 1);

            return new_state;

        default:
            return state;
    }
}

export function generatorViewMode(state={
                                     mode: 'json'
                                  }, action) {

    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'generator_view_mode.change':
            if (new_state.mode === 'json') {
                new_state.mode = 'raw'
            } else if (new_state.mode === 'raw') {
                new_state.mode = 'json'
            } else {
                new_state.mode = 'json'
            }

            return new_state;

        default:
            return state;
    }
}