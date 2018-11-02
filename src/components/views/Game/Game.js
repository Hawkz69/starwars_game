import React, { Component } from 'react';
import _ from 'lodash';
// Material-UI
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Spinner from 'react-spinkit';
import { stylesModal } from '../../../assets/pallet/variables_';
import { CardPerson, Timer, Toast } from "../../blocks";
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
            seconds: 3,
            minutes: 0,
            starTime: true
        };
        localStorage.setItem('points', 0);
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.persons !== undefined && nextProps.persons.length > 0){
            this.setState({persons: nextProps.persons})
        }
    }

    render() {
        const { seconds, minutes, starTime } = this.state
        const actions = [
            <FlatButton
                label="Cancelar"
                onClick={this.handleCloseModalInstructions}
            />,
            <FlatButton
                label="INICIAR"
                secondary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

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
                            starTime={starTime}
                            exitGame={this.onExitGame}
                        />
                    </div>
                </div>
                <div id="boxes" className="container_boxes">
                {
                    this.state.persons[this.state.page].map((item) => {
                        return (
                            <CardPerson key={item.name} person={item}/>
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
                                label="< Anterior"
                                Style="margin: 20px"
                                onClick={() => this.setState({page: this.state.page - 1, starTime: false})}
                                secondary={true}
                            />
                        )}
                    
                        {this.state.persons[this.state.page].length >= 10 && (
                            <FlatButton
                                label="Próxima >"
                                Style="margin: 20px"
                                onClick={() => this.setState({page: this.state.page + 1, starTime: false})}
                                secondary={true}
                            />
                        )}
                    </div>
                )}

                
                <Dialog
                    title="Como jogar"
                    actions={actions}
                    modal={false}
                    open={this.state.openModalInstructions}
                    onRequestClose={this.handleCloseModalInstructions}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={ false }
                    contentStyle={ stylesModal.dialogContent }
                    bodyStyle={ stylesModal.dialogBody }
                    style={ stylesModal.dialogRoot }
                >
                    <div id="contentModal">
                        <p>Com esse quiz você terá oportunidade de identificar os principais personagens de Star-
                        wars, marcar pontos e se tornar um expert nesta série de filmes maravilhosa!</p>

                        <p>Você terá 2 minutos para digitar os nomes dos personagens, exebidos no card, como na imagem abaixo:</p>
                        <img className="img_tutorial" src={require('../../../assets/img/tutorial.png')}/>
                        <p Style="font-weight: bold;text-align: center;">QUE A FORÇA ESTEJA COM VOCÊ!</p>
                    </div>
                </Dialog>
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
                seconds: 5,
                minutes: 0,
                page: 0,
                starTime: true
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