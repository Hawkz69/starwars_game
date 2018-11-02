import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { filmsActions } from '../redux/context/films';
import { AppView } from '../components/views';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: []
        }
        // this.props.history.push('/home');
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.films !== undefined){
            if(nextProps.films.data !== undefined){
                if(nextProps.films.data.data !== undefined){
                    this.setState({films: nextProps.films.data.data.results})
                }
            }
        }
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        if(this.props.films === undefined){
            dispatch(filmsActions.getFilms())
        }
    }



    render() {
        const { films } = this.state;
        return (
            <AppView 
                redirectGameStart={this.handleRedirectGameStart}
                films={films}
            />
        )
    }

    handleRedirectGameStart = () => {
        this.props.history.push('/game');
    }

}
const mapStateToProps = (state) => ({
    game: state.context.game,
    films: state.context.films,
});
  
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });
    
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));