import React, { Component } from 'react';
import _ from 'lodash';
// Material-UI
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { Animated } from "react-animated-css";
import IconButton from 'material-ui/IconButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Help from 'material-ui/svg-icons/action/help';
import SpeakerNotes from 'material-ui/svg-icons/action/speaker-notes';
import { placeholders, Colors, stylesModal } from '../../../assets/pallet/variables_'
// Style
import './CardPerson.css';

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
            titleModal: '',
            filmsApi: [],
            films: []
        };
    }

    componentDidMount = () => {
        if(this.props !== {}) {
            this.setState({
                nameApi: this.props.person.name,
                filmsApi: this.props.filmsApi
            })
            this.getReplyStorage(this.props.person.name);
        }
         
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.person !== undefined){
            this.setState({nameApi: nextProps.person.name})
        }
        if(nextProps.restart){
            this.setState({
                isDisableInput: false,
                isShowInput: 'none',
                name: ''
            }) 
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
        const { 
            isShowInput, 
            isDisableInput, 
            colorBtnOk, 
            titleModal,
            openModalPersonDescription
        } = this.state;

        return (
            <div className="container_card">
                <Animated animationIn="zoomIn" animationOut="pulse" isVisible={true}>
                    <div className="box">
                        <img 
                            className="person"
                            src={img}
                            onError={(e) => e.target.src = placeholders.person}
                            
                        />                    
                        <div id="actionsCard" className="actions_card">
                            <IconButton
                                iconStyle={stylesModal.smallIcon}
                                style={stylesModal.small}
                                onClick={this.showInput}
                            >
                                <Help color="#FC4081"/>
                            </IconButton>

                            <IconButton
                                iconStyle={stylesModal.smallIcon}
                                style={stylesModal.small}
                                onClick={this.handleOpenModalPersonDescription}
                            >
                                <SpeakerNotes color="#FF7F00"/>
                            </IconButton> 
                        </div>
                        <div id="form" className="formName"
                            style={{display: isShowInput}}
                        >
                            <TextField
                                hintText="Name"
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
                                iconStyle={stylesModal.smallIcon}
                                style={stylesModal.small}
                                disabled={isDisableInput}
                                onClick={this.saveNamePerson}
                            >
                                <CheckCircle color={colorBtnOk}/>
                            </IconButton> 
                        </div>                
                    </div>
                </Animated>
                
                <Dialog
                    title={titleModal}
                    actions={actions}
                    modal={false}
                    open={openModalPersonDescription}
                    onRequestClose={this.handleCloseModalPersonDescription}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={ false }
                    contentStyle={ stylesModal.dialogContent }
                    bodyStyle={ stylesModal.dialogBody }
                    style={ stylesModal.dialogRoot }
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


                        <p> Films:</p> 
                            { this.state.films.map((item) => {
                                return (
                                    <p>{item}</p>
                                )
                            })
                        }
                    </div>
                </Dialog>
            </div>
        );
    }

    getMoreInformationPerson = (films: Array) => {
        const { filmsApi } = this.state;
        let results = [];

        films.forEach (function (item) {
            let reply = filmsApi.find(function (film) { return film.url == item });   
                if(reply != undefined){
                    results.push(reply.title)
                }
        });
        this.setState({films: results})      
    }

    showInput = () => {
        this.setState({isShowInput: 'flex'})
    }

    getReplyStorage = (nameApi: String) => {
        let temp = localStorage.getItem('replys');
        if(temp !== null){
            temp = JSON.parse(temp);
            let reply = temp.find(function (reply) { return reply.originalName === nameApi; });
            if(reply != undefined){
                this.setState({
                    name: reply.replyName,
                    isShowInput: 'flex',
                    isDisableInput: true

                })
            }
        }
    }

    /* INCREMENTA PONTUAÇÃO COM BASE NO LOCAL STORAGE */
    incrementPoint = (value: String) => {
        let actualPoints = parseInt(localStorage.getItem('points'));
        if(actualPoints == null){
            localStorage.setItem('points', value);
        } else {
            localStorage.setItem('points', (actualPoints + value));
        }
    }

    /* SALVA RESPOSTAS NO LOCALSTORAGE (MONTA OBJETO) */
    saveReply = () => {
        const { name, nameApi } = this.state;
        let replys = localStorage.getItem('replys');
        if(replys !== null){
            let replysJson = JSON.parse(replys);
            replysJson.push({
                replyName: name,
                originalName: nameApi
            })
            localStorage.setItem('replys', [JSON.stringify(replysJson)]);
        } else {
            const reply = {
                replyName: name,
                originalName: nameApi
            };
            localStorage.setItem('replys', '[' + JSON.stringify(reply) + ']');
        }
    }

    /* COMPARA REPOSTA DIGITADA COM RESPOSTA CORRETA E VERIFICA SE USUÁRIO
        ABRIU INFORMAÇÕES - MANDA NOTA */
    saveNamePerson = () => {
        const { name, nameApi } = this.state;
        this.setState({
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
        this.saveReply();
    }

    onChange = (event: Any) => {
        this.setState({[event.target.id] : event.target.value})  
    }

    handleOpenModalPersonDescription = () => {
        /* CARREGA INFORMAÇÃO DE FILMES DO PERSONAGEM COM BASE NO STATE DO REDUX */
        this.getMoreInformationPerson(this.props.person.films);

        this.setState({
            openModalPersonDescription: true, 
            pointuationCard: 5, 
            titleModal: 'About the character'});
    };
    
    handleCloseModalPersonDescription = () => {
        this.setState({openModalPersonDescription: false});
    };
}