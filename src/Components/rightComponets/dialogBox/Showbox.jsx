import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';

const propTypes = {};

const defaultProps = {};

export default class Showbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Dialog >
                        <h1> hello world</h1>
                    </Dialog>
                </div>
                
            </React.Fragment>
        );
    }
}

 Showbox.propTypes = propTypes;
 Showbox.defaultProps = defaultProps;