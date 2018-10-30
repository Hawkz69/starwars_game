import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit';
// Style
import './Loading.css';

  
export default class ClinicConfigView extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
          <div id="loader" Style="position: absolute;
                                  width: 150px;
                                  align-items: center;
                                  height: 70px;
                                  background: white;
                                  border-radius: 10px;
                                  text-align: center;
                                  // border: solid 1px lightgray;
                                  margin-left: 20%;
                                  margin-top: 20%;
                                  background-color: white;
                                  z-index: 999999;">
              <Spinner Style="margin-top: 5px;" name="ball-beat" className="spinner" color={'#196b74'}/>
              <p Style="margin: 5px;
                          font-family: Muli;
                          color: #a9a7a7;">Carregando ... </p>
          </div>
        )
    }
}