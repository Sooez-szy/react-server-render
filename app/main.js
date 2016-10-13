/**
 * Created by Administrator on 2016/10/13.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,browserHistory} from 'react-router';
import routes from './routes';
import './stylesheets/mian.less';

ReactDOM.render(
    <Router  history={browserHistory}>{routes}</Router>,
    document.getElementById('app')
);

