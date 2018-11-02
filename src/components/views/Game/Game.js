import React, { Component } from 'react';
// Material-UI
import FlatButton from 'material-ui/FlatButton';
import Spinner from 'react-spinkit';
import { CardPerson, Timer } from "../../blocks";
// Style
import './Game.css';

export default class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalInstructions: false,
            persons: {
                '0': [],
            },
            page: 0,
            seconds: 0,
            minutes: 2,
            startTime: false,
            restart: false,
            films: [],
        };
        localStorage.setItem('points', 0);
        localStorage.removeItem('replys');
    }

    componentDidMount = () => {
        this.setState({startTime: true})
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.films.data.data !== undefined){
            this.setState({films: nextProps.films.data.data.results})
        }
        if(nextProps.persons !== undefined && nextProps.persons.length > 0){
            this.setState({persons: nextProps.persons})
        }
    }

    render() {
        const { seconds, minutes, startTime } = this.state;

        return (
            <div className="content_game">
                <div id="header" className="header">
                    <div id="title" className="title_header">
                        <img className="img_logo" src={require('../../../assets/img/logo.png')} />
                    </div>
                    <div id="containerTimer" className="container_timer">
                        <Timer 
                            minutes={minutes}
                            seconds={seconds}
                            restartGame={this.handleRestartGame}
                            starTime={startTime}
                            exitGame={this.onExitGame}
                        />
                    </div>
                </div>
                <div id="boxes" className="container_boxes">
                {
                    this.state.persons[this.state.page].map((item) => {
                        return (
                            <CardPerson 
                                key={item.name} 
                                person={item} 
                                restart={this.state.restart}
                                filmsApi={this.state.films}
                            />
                        )
                    })
                }
                </div>

                {this.state.persons.length < 9 ? (
                    <div id="loader" className="div_loader">
                        <Spinner name="three-bounce" />
                    </div>
                ) : (
                    <div id="pagination" className="div_pagination">
                        {this.state.page > 0 && (
                            <FlatButton
                                label="< Previous"
                                Style="margin: 20px"
                                onClick={() => this.setState({page: this.state.page - 1, starTime: false})}
                                secondary={true}
                            />
                        )}
                    
                        {this.state.persons[this.state.page].length >= 10 && (
                            <FlatButton
                                label="Next >"
                                Style="margin: 20px"
                                onClick={() => this.setState({page: this.state.page + 1, starTime: false})}
                                secondary={true}
                            />
                        )}
                    </div>
                )}          
            </div>
        );
    }

    onExitGame = (exit: Bollean) => {
        if(exit)
            this.props.onExitGame(exit)
    }

    handleRestartGame = (newGame) => {
        if(newGame){
            localStorage.setItem('points', 0);
            this.setState({
                seconds: 0,
                minutes: 2,
                page: 0,
                starTime: true,
                restart: true
            })
        }
    }

    handleOpenModalInstructions = () => {
        this.setState({openModalInstructions: true});
    };
    
    handleCloseModalInstructions = () => {
        this.setState({openModalInstructions: false});
    };
}