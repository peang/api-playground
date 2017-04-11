import React from "react";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
// Containers
import Full from "./containers/Full/";
import Simple from "./containers/Simple/";
import Dashboard from "./views/Dashboard/";
import Generator from "./views/Components/Generator";
import Page404 from "./views/Pages/Page404";

export default (
    <Route history={browserHistory}>
        <Route path="/" name="Playground" component={Full}>
            <IndexRoute component={Dashboard}/>
            <Route name="Play" path="/play" component={Generator}/>
        </Route>

        <Route path="*" component={Simple}>
            <IndexRoute component={Page404}/>
        </Route>
    </Route>
)