import React, { Component } from 'react';
import _ from 'lodash';
// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Ranking } from '../../blocks'

// Style
import './App.css';

const styles = {
    dialogRoot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 0
    },
    dialogContent: {
      position: "relative",
      width: "70vw",
      transform: "",
    },
    dialogBody: {
      paddingBottom: 0
    }
  };

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
        let actions = [
            <FlatButton
                label="Cancelar"
                onClick={this.handleCloseModalInstructions}
            />,
            <FlatButton
                label={this.state.labelAction}
                secondary={true}
                keyboardFocused={true}
                onClick={this.redirectModal}
            />,
        ];

        return (
            <div className="container_app">
                <div className="box_">
                    <div><p onClick={this.renderRanking} Style="margin: 10px; font-family: Marker Felt; cursor: pointer">Ranking</p></div>
                    <img src={require('../../../assets/img/nave_leah.png')} className="leah"/>
                    <img src={require('../../../assets/img/img_home.png')} className="img_home"/>
                    <div id="gameStart" className="gameStart">
                        <RaisedButton onClick={this.handleOpenModalInstructions} label="INICIAR" secondary={true}/>
                    </div>        
                </div>
                <Dialog
                    title={this.state.titleModal}
                    actions={actions}
                    modal={false}
                    open={this.state.openModalInstructions}
                    onRequestClose={this.handleCloseModalInstructions}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={ false }
                    contentStyle={ styles.dialogContent }
                    bodyStyle={ styles.dialogBody }
                    style={ styles.dialogRoot }
                >
                {!this.state.ranking ? (
                    <div id="contentModal">
                        <p>Com esse quiz você terá oportunidade de identificar os principais personagens de Star-
                        wars, marcar pontos e se tornar um expert nesta série de filmes maravilhosa!</p>

                        <p>Você terá 2 minutos para digitar os nomes dos personagens, exebidos no card, como na imagem abaixo:</p>
                        <img className="img_tutorial" src={require('../../../assets/img/tutorial.png')}/>
                        <p Style="font-weight: bold;text-align: center;">QUE A FORÇA ESTEJA COM VOCÊ!</p>
                    </div>
                ) : (
                    <div id="contentModal">
                        <Ranking ranking={this.state.rankingList}/>
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
            titleModal: 'Como jogar',
            ranking: false,
            openModalInstructions: true,
            labelAction: 'JOGAR' ,
        });
    };
    
    handleCloseModalInstructions = () => {
        this.setState({openModalInstructions: false});
    };
}