/**
 * Created by Administrator on 2016/10/13.
 */
import React from 'react';
import {Route} from 'react-router';
import {App} from './components/App';
import {Home} from './components/Home';
/**
 * 配置react路由
 */
export default (
    <Route component={App}>
        <Route path="/" component={Home} />
    </Route>
)