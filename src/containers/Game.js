import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { gameActions } from '../redux/context/game';
import { GameView } from '../components/views';

let persons = [];
let page = 1;

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: []
        }
        // this.props.history.push('/home');
    }



    componentDidMount = () => {
        const { dispatch } = this.props;
        if(this.props.game === undefined){
            dispatch(gameActions.getPersons(page))
        } else {
            if(this.props.game.data.data !== undefined){
                if(this.props.game.data.data !== undefined){
                    if(this.props.game.data.data.next !== null){
                        dispatch(gameActions.getPersons(page)) 
                    } else {
                        persons = this.props.game.persons;
                        this.setState({persons}) 
                    } 
                } 
            }    
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const { dispatch } = this.props;
        /* Inicio de bloco para verificar se já foram carregadas os
            personagens pno redux para não carregar novament */ 
        if(this.props.game !== undefined){
            if(this.props.game.data !== undefined){
                if(this.props.game.data.data !== undefined){
                    if(this.props.game.data.data.next !== null){
                        /* fim bloco  */ 

                        /* Inicio de bloco para verificar se chegou novas informações
                            se chegou ele da o dispatch novamente
                            até que o next seja null (passou por todas pages) */ 
                        if(nextProps.game !== undefined) {
                            if(nextProps.game.data !== undefined) {
                                if(nextProps.game.data.data.next !== null){
                                    if(page === 1){
                                        page++
                                        dispatch(gameActions.getPersons(page))
                                        persons.push(nextProps.game.data.persons) 
                                        this.setState({persons})
                                    } else {
                                        if(nextProps.game.data.data.next !== this.props.game.data.data.next){
                                            page++
                                            dispatch(gameActions.getPersons(page))
                                            persons.push(nextProps.game.data.persons)
                                        } 
                                    }
                                } else {
                                    if(nextProps.game.data.data.next !== this.props.game.data.data.next){
                                        persons.push(nextProps.game.data.persons)
                                        dispatch(gameActions.savePersons(persons))
                                        this.setState({persons})
                                    }
                                }   
                            }
                        }
                    } else {
                        this.setState({persons: this.props.game.persons})
                    }
                }
            } else {
                dispatch(gameActions.savePersons(persons))
            }
        }    
    }

    render() {
        return (
            <GameView 
                persons={this.state.persons}
                onExitGame={this.handleExitGame}
                films={this.props.films}
            />
        )
    }

    handleExitGame = (exit: Boollean) => {
        if(exit)
            this.props.history.push('/');   
    }

}
const mapStateToProps = (state) => ({
    game: state.context.game,
    films: state.context.films
});
  
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });
    
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game));