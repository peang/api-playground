export function sidebar(state = {
                            state: 'done',
                            sidebar_component: [],
                            api_host: `${process.env.API_HOST}`
                        }, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'sidebar.service_data':
            new_state = {
                state: 'loading',
                sidebar_component: [],
                api_host: `${process.env.API_HOST}`
            }

            return new_state;

        case 'sidebar.service_data_success':
            new_state = {
                state: 'done',
                sidebar_component: action.data,
                api_host: `${process.env.API_HOST}`
            }

            return new_state;

        case 'sidebar.service_data_error':
            new_state = {
                state: 'error',
                sidebar_component: [],
                api_host: `${process.env.API_HOST}`
            }

            return new_state;

        default:
            return state;
    }
}
