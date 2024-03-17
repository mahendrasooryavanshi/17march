import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/Header';

const propTypes = {};

const defaultProps = {};

export default class Pull extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
           <>
           <Header heading={'Poll Managment'} />
           <div style={{height:'100%',maxWidth:'70%', marginLeft: '30%',}}>
            
            <h1>Poll managment component</h1>
            </div>
           </>
        );
    }
}

 Pull.propTypes = propTypes;
 Pull.defaultProps = defaultProps;