/**
 * Created by Administrator on 2016/10/13.
 */
import React from 'react';
export class App extends React.Component{
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}