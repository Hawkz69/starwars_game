import React, { Component } from 'react';
// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

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
                onClick={this.redirectGameStart}
            />,
        ];

        return (
            <div className="container_app">
                <div className="box_">
                    <img src={require('../../../assets/img/nave_leah.png')} className="leah"/>
                    <img src={require('../../../assets/img/img_home.png')} className="img_home"/>
                    <div id="gameStart" className="gameStart">
                        <RaisedButton onClick={this.handleOpenModalInstructions} label="INICIAR" secondary={true}/>
                    </div>        
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

    redirectGameStart = () => {
       this.props.redirectGameStart();
    };

    handleOpenModalInstructions = () => {
        this.setState({openModalInstructions: true});
    };
    
    handleCloseModalInstructions = () => {
        this.setState({openModalInstructions: false});
    };
}