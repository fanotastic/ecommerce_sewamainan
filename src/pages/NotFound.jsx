import React, { Component } from 'react';

class NotFoundPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <h1 className='text-center'>ERROR 404 PAGE NOT FOUND! </h1>
            </div>
        );
    }
}

export default NotFoundPage;