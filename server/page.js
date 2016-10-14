/**
 * Created by Administrator on 2016/10/13.
 */
import React from 'react';
import {renderToString} from 'react-dom/server';
import swig from 'swig';
import {RouterContext, match} from 'react-router';
import routes from '../app/routes';

module.exports = (req, res)=>{
    match({routes, location: req.url}, (err, redirectLocation, renderProps)=> {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const html = renderToString(
                <RouterContext {...renderProps} />
            );
            const page = swig.renderFile('views/index.html', {html: html});
            res.send(page)
        } else {
            res.status(404).end('Not found');
        }

    });
};