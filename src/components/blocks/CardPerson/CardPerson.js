import React, { Component } from 'react';
// Material-UI
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Animated } from "react-animated-css";
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Help from 'material-ui/svg-icons/action/help';
import SpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';
// Style
import './CardPerson.css';

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
    },
    smallIcon: {
        width: 30,
        height: 30,
    },
    small: {
        width: 48,
        height: 48,
        padding: 12,
    },
};

export default class CardPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isShowInput: 'none',
            isDisableInput: false,
            colorBtnOk: 'green'
        };
    }

    render() {
        const actions = [
            <FlatButton
                label="OK"
                secondary={true}
                keyboardFocused={true}
                onClick={this.handleCloseModalInstructions}
            />,
        ];

        const { isShowInput, isDisableInput, colorBtnOk } = this.state;

        return (
            <div className="container_card">
                <Animated animationIn="zoomIn" isVisible={true}>
                    <div className="box">
                        <img className="person" src={require('../../../assets/img/Darth_Vader.png')}/>
                        <div id="actionsCard" Style="display: flex; justify-content: center;">
                            <IconButton
                                iconStyle={styles.smallIcon}
                                style={styles.small}
                                onClick={() => this.setState({isShowInput: 'flex'})}
                            >
                                <Help color="#FC4081"/>
                            </IconButton>

                            <IconButton
                                iconStyle={styles.smallIcon}
                                style={styles.small}
                                onClick={this.handleOpenModalInstructions}
                            >
                                <SpeakerNotes color="#FF7F00"/>
                            </IconButton> 
                        </div>
                        <div id="form" Style="width: 100%;
                            display: flex;
                            margin-top: -5px;
                            height: 40px;
                            /* background-color: rebeccapurple; */
                            border-radius: 0px 0px 10px 10px;"
                            style={{display: isShowInput}}
                        >
                            <TextField
                                hintText="Nome"
                                disabled={isDisableInput}
                                style={{
                                    width: '80%',
                                    marginTop: -10,
                                    marginLeft: 5
                                }}
                            />
                            <IconButton
                                iconStyle={styles.smallIcon}
                                style={styles.small}
                                onClick={this.saveNamePerson}
                            >
                                <CheckCircle color={colorBtnOk}/>
                            </IconButton> 
                        </div>                
                    </div>
                </Animated>
                
                <Dialog
                    title="Sobre o personagem"
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

    saveNamePerson = () => {
        this.setState({
            colorBtnOk: 'gray',
            isDisableInput: true,
        })
    }


    handleOpenModalInstructions = () => {
        this.setState({openModalInstructions: true});
    };
    
    handleCloseModalInstructions = () => {
        this.setState({openModalInstructions: false});
    };
}