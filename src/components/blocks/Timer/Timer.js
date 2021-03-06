import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Toast } from '../../blocks'
import { Colors, stylesModal } from '../../../assets/pallet/variables_'
// Style
import './Timer.css';


let timer = null;

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalInstructions: false,
            minutes: this.props.minutes,
            seconds: this.props.seconds,
            openModalEnd: false,
            isDesabled: false,
            name: '',
            email: '',
            openToast: false,
            msg: '',
            timerToast: 0,
            errorEmail: '',
            errorName: '',
            classNameAnimation: 'div_animation_timer',
            starTime: false
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.starTime && !this.state.starTime){
            this.setState({
                seconds: nextProps.seconds,
                minutes: nextProps.minutes,
                starTime: true
            })
            timer = setInterval(function(){this.startTime() }.bind(this), 1000);
        }
    }

    render() {
        const { 
            isDesabled,
            openToast,
            msg,
            timerToast,
            errorEmail,
            errorName,
            name,
            email
        } = this.state;

        const actions = [
            <FlatButton
                label="START"
                secondary={true}
                keyboardFocused={true}
                onClick={this.restartGame}
            />,
            <FlatButton
                label="Exit"
                onClick={this.exitGame}
            />,
        ];

        return (
            <div id="timer" className="_container_timer">
                <div id="animationTimer" className={this.state.classNameAnimation}/>
                <h4 className="label_timer">{this.state.minutes}:{this.state.seconds}</h4>

                <Dialog
                    title={'Times up :('}
                    actions={actions}
                    modal={true}
                    open={this.state.openModalEnd}
                    onRequestClose={this.handleCloseModalPoints}
                    autoScrollBodyContent={true}
                    repositionOnUpdate={ false }
                    contentStyle={ stylesModal.dialogContent }
                    bodyStyle={ stylesModal.dialogBody }
                    style={ stylesModal.dialogRoot }
                >
                    <div id="contentModal" Style="text-align: center;">
                        <p className="title_points_total">You made {localStorage.getItem('points')} points!</p>

                        <p>Enter your name and email and enter our ranking:</p>
                        <div id="inputsSendEmail" className="inputs_send_email_container">
                            <TextField
                                    hintText="Name"
                                    id="name"
                                    onBlur={() => this.validFields(name, email)}
                                    underlineFocusStyle={{borderColor: Colors.secondary}}
                                    value={this.state.name}
                                    errorText={errorName}
                                    onChange={this.onChange}
                                    disabled={isDesabled}
                                    style={{
                                        width: '80%',
                                    }}
                                />
                                <TextField
                                    hintText="Email"
                                    id="email"
                                    onChange={this.onChange}
                                    onBlur={() => this.validFields(name, email)}
                                    underlineFocusStyle={{borderColor: Colors.secondary}}
                                    value={this.state.email}
                                    errorText={errorEmail}
                                    disabled={isDesabled}
                                    style={{
                                        width: '80%',
                                    }}
                                />
                                <RaisedButton disabled={isDesabled} onClick={this.sendRanking} style={{marginTop: 10, marginBottom: 30}}label="SEND" secondary={true}/>
                        </div>
                    </div>
                </Dialog>
                <Toast open={openToast} msg={msg} time={timerToast} />
            </div>
        );
    }

    /* Encerra o jogo e redireciona para HOME */ 
    exitGame = () => {
        this.handleCloseModalPoints();
        this.props.exitGame(true);
    }

    /* Inicia jogo zerando cronometro e limpando storage */ 
    restartGame = () => {
        localStorage.removeItem('replys');
        this.handleCloseModalPoints();
        this.props.restartGame(true);
        this.setState({
            classNameAnimation: 'div_animation_timer',
            openToast: false,
            isDesabled: false
        })
    }

    validEmail = (email) => {
        let regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
        if(regex.test(email))
            return true
    }
    

    validFields = (name, email) => {
        let erros = false;
    
        if(email === ''){
            this.setState({ errorEmail: 'Is required' })
            erros = true;
        } else {
            if(!this.validEmail(email)){
                this.setState({ errorEmail: 'Is invalid' })
                erros = true;
            } else {
                this.setState({ errorEmail: '' })
            }
        } 

        if(name === ''){
            this.setState({ errorName: 'Is required' }) 
            erros = true;
        } else {
            this.setState({ errorName: '' }) 
        }

        if(!erros)
            return true;
    }

    /* Envia as informações do usuário para o ranking */ 
    sendRanking = () => {
        const { name, email } = this.state;
        if(this.validFields(name, email)){
            let ranking = localStorage.getItem('ranking');
            if(ranking !== null){
                this.pushRankingItem(ranking)
            } else {
                let newRanking_json = { 
                    name: this.state.name,
                    email: this.state.email,
                    points: localStorage.getItem('points')
                }
                localStorage.setItem('ranking', '[' + JSON.stringify(newRanking_json) + ']')
            }
            this.setState({
                isDesabled: true,
                openToast: true,
                msg: 'Success!',
                timerToast: 3000
            })
        }
    }

    /* Insere o usuário no ranking (push no obj) */ 
    pushRankingItem = (ranking: String) => {
        let ranking_json = JSON.parse(ranking);
        ranking_json.push({
            name: this.state.name,
            email: this.state.email,
            points: localStorage.getItem('points')
        })
        localStorage.setItem('ranking', [JSON.stringify(ranking_json)])
    }

    /* Inicia decremento do cronometro */ 
    startTime = () => {
        const { minutes, seconds } = this.state;
        if( minutes >= 0 ){
            if( seconds > 0 ) {
                if( seconds > 10 )
                    this.setState({seconds: parseFloat(seconds-1)})
                else
                    this.setState({seconds: ('0') + parseFloat(seconds-1)})
            } else {
                if (minutes > 0){
                    this.setState({
                        seconds: parseFloat(59),
                        minutes: parseFloat(minutes-1)
                    })
                } else {
                    clearInterval(timer);
                    this.setState({
                        seconds: '00',
                        minutes: '0',
                        openModalEnd: true,
                        classNameAnimation: null,
                        starTime: false
                    })
                }      
            }
        } else {
            clearInterval(timer);
            this.setState({
                seconds: '00',
                minutes: '0',
                openModalEnd: true,
                classNameAnimation: null,
                starTime: false
            })
        }
    }

    onChange = (event: Any) => {
        this.setState({[event.target.id] : event.target.value})  
    }

    handleOpenModalPoints = () => {
        this.setState({openModalEnd: true})
    };
    
    handleCloseModalPoints = () => {
        this.setState({openModalEnd: false});
    };
}