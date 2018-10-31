import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { authActions } from '../redux/context/game';
import { GameView } from '../components/views';


class Game extends Component {
    constructor(props) {
        super(props);
        // this.props.history.push('/home');
    }

    render() {
        return (
            <GameView />
        )
    }

}
const mapStateToProps = (state) => ({
    auth: state.context.auth,
});
  
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });
    
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game));