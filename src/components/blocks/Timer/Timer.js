import React, { Component } from 'react';
// Style
import './Timer.css';


let timer = null;

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalInstructions: false,
            minutes: this.props.minutes,
            seconds: this.props.seconds,
        };
    }

    componentDidMount = () => {
        timer = setInterval(function(){this.startTime() }.bind(this), 1000);
    }

    render() {
        return (
            <div id="timer" Style="width: 100%;
            height: 100%;display: flex;
            align-items: center;
            background-color: white">
                <div id="animationTimer" className="div_animation_timer"/>
                <h4 className="label_timer">{this.state.minutes}:{this.state.seconds}</h4>
            </div>
        );
    }

    startTime = () => {
        const {minutes, seconds } = this.state;
        if(minutes >= 0){
            if(seconds > 0) {
                if(seconds > 10)
                    this.setState({seconds: parseFloat(seconds-1)})
                else
                    this.setState({seconds: ('0') + parseFloat(seconds-1)})
            } else {
                if (minutes > 0){
                    this.setState({seconds: parseFloat(59)})
                    this.setState({minutes: parseFloat(minutes-1)})
                } else {
                    clearInterval(timer);
                    this.setState({seconds: '00'})
                    this.setState({minutes: '0'})
                    alert("terminou");
                }      
            }
        } else {
            clearInterval(timer);
            this.setState({seconds: '00'})
            this.setState({minutes: '0'})
            alert("terminou");
        }
    }
}