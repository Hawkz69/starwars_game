import React, { Component } from 'react';
// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { CardPerson, Timer } from "../../blocks";
import placeholders from '../../../assets/pallet/variables_'
// Style
import './Game.css';


let timer = null;

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

export default class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalInstructions: false
        };
    }

    render() {
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
                <div id="header" Style="width: 100%;
                                        height: 10%;
                                        position: fixed;
                                        display:flex;
                                        z-index:9">

                    <div id="title" Style="width: 75%;
                                        height: 100%;
                                        background-color: white;
                                        box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
                                        ">
                        <img className="img_logo" src={require('../../../assets/img/logo.png')} />

                    </div>
                    <div id="containerTimer" className="container_timer">
                        <Timer minutes="2" seconds="00" />
                    </div>
                </div>
                <div id="boxes" className="container_boxes">
                    <CardPerson />
                    <CardPerson />
                    <CardPerson />
                    <CardPerson />
                    <CardPerson />
                    <CardPerson />
                    <CardPerson />
                    <CardPerson />
                </div>

                <div id="pagination" Style="width: 100%;
                                            display: flex;
                                            height: 100px;
                                            align-items: center;
                                            text-align: center;
                                            justify-content: center;">
                    <h4 Style="margin: 20px">Anterior</h4>
                    <h4 Style="margin: 20px">Próxima</h4>
                </div>

                
                <Dialog
                    title="Como jogar"
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


    handleOpenModalInstructions = () => {
        this.setState({openModalInstructions: true});
    };
    
    handleCloseModalInstructions = () => {
        this.setState({openModalInstructions: false});
    };
}