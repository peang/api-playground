import express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import {match, RouterContext} from "react-router";
import routes from "./../routes";
import Page404 from "./../views/Pages/Page404";
import Page500 from "./../views/Pages/Page500";
import Simple from "./../containers/Simple";
import {Provider} from "react-redux";
import {reducers} from './../reducers';
import {createStore} from "redux";

const router = express.Router();

router.get('*', (req, res) => {
    match(
        {routes, location: req.url},
        (err, redirectLocation, renderProps) => {
            let markup;

            // in case of error display the error message
            if (err) {
                if (req.app.get('env') === 'development') {
                    markup = renderToString(
                        <Simple>
                            <Page500 />
                        </Simple>
                    );

                    res.status(500);

                    return res.render('break', {markup});
                }

                return res.status(500).send(err.message);
            }

            // in case of redirect propagate the redirect to the browser
            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            // generate the React markup for the current route
            if (renderProps) {
                const initial_state = {}

                const store = createStore(
                    reducers,
                    initial_state,
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                );

                // if the current route matched we have renderProps
                markup = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );

            } else {
                // otherwise we can render a 404 page
                markup = renderToString(
                    <Simple>
                        <Page404 />
                    </Simple>
                );
                res.status(404);

                return res.render('break', {markup});
            }

            // render the index template with the embedded React markup
            return res.render('index', {markup});
        }
    )
})

module.exports = router;