import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {sidebar} from './components/Sidebar/reducers';
import {authentication} from './views/components/AuthHeader/reducers';
import {generatorBody, generatorForm, generatorRequest, generatorQueryParamForm, generatorViewMode} from './views/Components/Generator/reducer';

const allReducers = {
    sidebar: sidebar,
    generator_body: generatorBody,
    generator_form: generatorForm,
    generator_query_param_form: generatorQueryParamForm,
    generator_request: generatorRequest,
    generator_view_mode: generatorViewMode,
    authentication: authentication,
    form: formReducer
}

export const reducers = combineReducers(allReducers);