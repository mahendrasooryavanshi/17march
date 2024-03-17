import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/Header';
const propTypes = {};

const defaultProps = {};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
            <Header heading={'Dashboard'}/>
            <div className='container-fluid'style={{height:'100%',maxWidth:'70%', marginLeft: '30%',}} >
             <div className="row" style={{margin:10}}>
                <div className="col-md-4" style={{display:'flex',flexWrap: 'nowrap',background:'#ffffff'}}>
                    <div style={{display:'flex',flexWrap: '-moz-initial'}}>
                    <img src="https://admin.crowd-hub.app/assets/icons/user.svg" alt="" />
                    <div style={{textAlign:'start',marginLeft:5}}>
                    <h5 style={{marginBottom:0}}> 25</h5> 
                    <p style={{marginBottom:0}}>total number of registed user</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4" style={{display:'flex',flexWrap: 'nowrap',background:'#ffffff'}}>
                    <div style={{display:'flex',flexWrap: '-moz-initial'}}>
                    <img src="https://admin.crowd-hub.app/assets/icons/action.svg" alt="" />
                    <div style={{textAlign:'start',marginLeft:5}}>
                    <h5 style={{marginBottom:0}}> 15</h5> 
                    <p style={{marginBottom:0}}>total number of Active users</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-4" style={{display:'flex',flexWrap: 'nowrap',background:'#ffffff'}}>
                    <div style={{display:'flex',flexWrap: '-moz-initial'}}>
                    <img src="https://admin.crowd-hub.app/assets/icons/complete.svg" alt="" />
                    <div style={{textAlign:'start',marginLeft:5}}>
                    <h5 style={{marginBottom:0}}> 10</h5> 
                    <p style={{marginBottom:0}}>Total number of completed polls</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </>
        );
    }
}

 Home.propTypes = propTypes;
 Home.defaultProps = defaultProps;