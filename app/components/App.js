/**
 * Created by Administrator on 2016/10/13.
 */
import React from 'react';
import {Footer} from './Footer';
import {Navbar} from './Navbar';
export class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}