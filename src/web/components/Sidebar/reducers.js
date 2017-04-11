export function sidebar(state = {
                            state: 'done',
                            sidebar_component: []
                        }, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'sidebar.service_data':
            new_state = {
                state: 'loading',
                sidebar_component: []
            }

            return new_state;

        case 'sidebar.service_data_success':
            new_state = {
                state: 'done',
                sidebar_component: action.data
            }

            return new_state;

        case 'sidebar.service_data_error':
            new_state = {
                state: 'error',
                sidebar_component: []
            }

            return new_state;

        default:
            return state;
    }
}
