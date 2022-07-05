import 'regenerator-runtime/runtime';

import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3-near';
import Routing from './components/Routing';
import { RECAPTCHA_ENTERPRISE_SITE_KEY } from './config';
// import { initSentry } from './utils/sentry';
// initSentry();

import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import createRootReducer from './redux/createReducers';//三个combineReducers
import createMiddleware from './redux/middleware';


const history = createBrowserHistory();
// 创建store createMiddleware添加thunk异步 fetch api
export const store = createStore(createRootReducer(history), createMiddleware(history));

store.addAccountReducer = () => {
    store.replaceReducer(createRootReducer(history));
};

ReactDOM.render(
    <GoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_ENTERPRISE_SITE_KEY}
        useRecaptchaNet={true}
        useEnterprise={true}
    >
        <Provider store={store}>
            {/* 核心redux slices store 数据流 */}
            <LocalizeProvider store={store}>
                <Routing history={history} />
            </LocalizeProvider>
        </Provider>
    </GoogleReCaptchaProvider>,
    document.getElementById('root')
);
