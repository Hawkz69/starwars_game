import React, { Component } from 'react';
// Material-UI
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Animated } from "react-animated-css";
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Help from 'material-ui/svg-icons/action/help';
import SpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';
import { placeholders, Colors } from '../../../assets/pallet/variables_'
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
            nameApi: '',
            isShowInput: 'none',
            isDisableInput: false,
            colorBtnOk: 'green',
            pointuationCard: 0,
            titleModal: ''
        };
    }

    componentDidMount = () => {
        if(this.props !== {}) {
            this.setState({nameApi: this.props.person.name})
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.person !== undefined){
            this.setState({nameApi: nextProps.person.name})
        }
    }

    render() {
        const urlImgs = 'https://s3.amazonaws.com/starquiz/persons/'
        const actions = [
            <FlatButton
                label="OK"
                secondary={true}
                keyboardFocused={true}
                onClick={this.handleCloseModalPersonDescription}
            />,
        ];
        const img  = urlImgs + this.props.person.name + '.png';
        const { isShowInput, isDisableInput, colorBtnOk } = this.state;

        return (
            <div className="container_card">
                <Animated animationIn="zoomIn" animationOut="pulse" isVisible={true}>
                    <div className="box">
                        <img 
                            className="person"
                            src={img}
                            onError={(e) => e.target.src = placeholders.person}
                            
                        />                    
                        <div id="actionsCard" Style="display: flex; justify-content: center;">
                            <IconButton
                                iconStyle={styles.smallIcon}
                                style={styles.small}
                                onClick={this.showInput}
                            >
                                <Help color="#FC4081"/>
                            </IconButton>

                            <IconButton
                                iconStyle={styles.smallIcon}
                                style={styles.small}
                                onClick={this.handleOpenModalPersonDescription}
                            >
                                <SpeakerNotes color="#FF7F00"/>
                            </IconButton> 
                        </div>
                        <div id="form" className="formName"
                            style={{display: isShowInput}}
                        >
                            <TextField
                                hintText="Nome"
                                id="name"
                                value={this.state.name}
                                underlineFocusStyle={{borderColor: Colors.secondary}}
                                onChange={this.onChange}
                                disabled={isDisableInput}
                                ref={(input) => { this.name = input; }}
                                autoFocus
                                style={{
                                    width: '86%',
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
                    title={this.state.titleModal}
                    actions={actions}
                    modal={false}
                    open={this.state.openModalPersonDescription}
                    onRequestClose={this.handleCloseModalPersonDescription}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={ false }
                    contentStyle={ styles.dialogContent }
                    bodyStyle={ styles.dialogBody }
                    style={ styles.dialogRoot }
                >
                    <div id="contentModal">
                        {this.props.person.birth_year != 'unknown' ? (
                            <p>Birth Year: {this.props.person.birth_year}</p>
                        ) : null}
                    
                        {this.props.person.eye_color != 'unknown' ? (
                            <p>Eye Color: {this.props.person.eye_color}</p>
                        ) : null}

                        {this.props.person.gender != 'unknown' ? (
                            <p>Gender: {this.props.person.gender}</p>
                        ) : null}

                        {this.props.person.hair_color != 'unknown' ? (
                            <p>Hair Color: {this.props.person.hair_color}</p>
                        ) : null}

                        {this.props.person.height != 'unknown' ? (
                            <p>Height: {this.props.person.height}</p>
                        ) : null}

                        {this.props.person.mass != 'unknown' ? (
                            <p>Mass: {this.props.person.mass}</p>
                        ) : null}

                    </div>
                </Dialog>
            </div>
        );
    }

    showInput = () =>{
        this.setState({isShowInput: 'flex'})
    }

    incrementPoint = (value) => {
        let actualPoints = parseInt(localStorage.getItem('points'));
        if(actualPoints == null){
            localStorage.setItem('points', value);
        } else {
            localStorage.setItem('points', (actualPoints + value));
        }
    }

    saveNamePerson = () => {
        const { name, nameApi } = this.state;
        this.setState({
            colorBtnOk: 'gray',
            isDisableInput: true,
        })
        const _name = name.toString().toUpperCase();
        const _nameApi = nameApi.toString().toUpperCase();
        if(_name == _nameApi){
            if(this.state.pointuationCard == 5){
                this.incrementPoint(5);
            } else {
                this.incrementPoint(10);
            }  
        };
    }

    onChange = (event) => {
        this.setState({[event.target.id] : event.target.value})  
    }

    handleOpenModalPersonDescription = () => {
        this.setState({openModalPersonDescription: true, pointuationCard: 5, titleModal: 'Sobre o personagem'});
    };
    
    handleCloseModalPersonDescription = () => {
        this.setState({openModalPersonDescription: false});
    };
}