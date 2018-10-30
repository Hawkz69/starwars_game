import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { authActions } from '../redux/context/auth';
import { AppView } from '../components/views';


class App extends Component {
    constructor(props) {
        super(props);
        // this.props.history.push('/home');
    }

    render() {
        return (
            <AppView />
        )
    }

    signIn = (data) => {
        const { dispatch } = this.props;
        dispatch(authActions.auth(data))
    }

}
const mapStateToProps = (state) => ({
    auth: state.context.auth,
});
  
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });
    
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));