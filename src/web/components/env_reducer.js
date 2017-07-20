export function env(state = {
                            API_URL: `${process.env.API_HOST}`
                        }, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'env.prod':
            new_state = {
                API_URL : `${process.env.API_URL_PROD}`
            }

            return new_state;

        case 'env.dev':
            new_state = {
                API_URL : `${process.env.API_URL_DEV}`
            }

            return new_state;

        default:
            return state;
    }
}