import React, { Component } from 'react';
import _ from 'lodash';
// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { Ranking } from '../../blocks';
import { stylesModal } from '../../../assets/pallet/variables_';

// Style
import './App.css';

export default class AppView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalInstructions: false,
            ranking: false,
            rankingList: null,
            titleModal: ''
        };
    }

    render() {
        const {
            titleModal,
            labelAction,
            rankingList
        } = this.state;

        let actions = [
            <FlatButton
                label="Cancel"
                onClick={this.handleCloseModalInstructions}
            />,
            <FlatButton
                label={labelAction}
                secondary={true}
                keyboardFocused={true}
                onClick={this.redirectModal}
            />,
        ];

        return (
            <div className="container_app">
                <div className="box_">
                    <div><p onClick={this.renderRanking} className="label_ranking">Ranking</p></div>
                    <img src={require('../../../assets/img/nave_leah.png')} className="leah"/>
                    <img src={require('../../../assets/img/img_home.png')} className="img_home"/>
                    <div id="gameStart" className="gameStart">
                        <RaisedButton onClick={this.handleOpenModalInstructions} label="START" secondary={true}/>
                    </div>        
                </div>
                <Dialog
                    title={titleModal}
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
                {!this.state.ranking ? (
                    <div id="contentModal">
                        <p>With this quiz you will have the opportunity to identify the main characters of Star-
                        wars, score points and become an expert in this wonderful film series!</p>

                        <p>You will have 2 minutes to enter the names of the characters, shown on the card, as in the image below:</p>
                        <img className="img_tutorial" src={require('../../../assets/img/tutorial.png')}/>
                        <p Style="font-weight: bold;text-align: center;">MAY THE FORCE BE WITH YOU!</p>
                    </div>
                ) : (
                    <div id="contentModal">
                        <Ranking ranking={rankingList} />
                    </div>
                )}
                </Dialog>
            </div>
        );
    }

    redirectGameStart = () => {
       this.props.redirectGameStart();
    };

    renderRanking = () => {
        this.setState({ranking: true, openModalInstructions: true})
        let ranking = localStorage.getItem('ranking');
        if(ranking !== null){
            ranking = JSON.parse(ranking)
            ranking = _.orderBy(ranking, 'points', 'desc');
            this.setState({
                titleModal: 'Ranking',
                rankingList: ranking,
                labelAction: 'OK'});
        } else {
            this.setState({
                titleModal: 'Ranking',
                rankingList: ranking,
                labelAction: 'OK'});
        }
    }

    redirectModal = () => {
        if(!this.state.ranking)
            this.redirectGameStart();
        else 
            this.handleCloseModalInstructions();
        
    }

    handleOpenModalInstructions = () => {
        this.setState({
            titleModal: 'How to play',
            ranking: false,
            openModalInstructions: true,
            labelAction: 'START' ,
        });
    };
    
    handleCloseModalInstructions = () => {
        this.setState({openModalInstructions: false});
    };
}