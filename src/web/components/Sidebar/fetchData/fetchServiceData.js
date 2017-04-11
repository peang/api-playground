import axios from 'axios';

export default (props) =>{
    props.dispatch({
        type: 'sidebar.service_data'
    })

    axios.get('/api/service')
        .then((res) => {
            props.dispatch({
                type: 'sidebar.service_data_success',
                data: res.data.data
            })
        })
        .catch((err) => {
            console.log(err);

            props.dispatch({
                type: 'sidebar.service_data_error'
            })
        })
}