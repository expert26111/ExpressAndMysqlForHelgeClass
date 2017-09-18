/**
 * Created by Yoana on 9/7/2017.
 */

import React from 'react'
import ReactDOM from 'react-dom'

var CommentBox = React.createClass({
    render: function(){
        return (
            <div>Hello I am React Box!!!</div>
        );
    }
});

ReactDOM.render(
    <CommentBox/>,document.getElementById('content')
);