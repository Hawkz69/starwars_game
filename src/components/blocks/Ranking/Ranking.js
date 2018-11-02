import React, { Component } from 'react';
// Material-UI
import {List, ListItem} from 'material-ui/List';

// Style
import './Ranking.css';



export default class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if(this.props.ranking == null)
            return (
                <div>
                    <h2>No Ranking :(</h2>
                </div> 
            )
        return (
            <div>
                <h3>Nossos feras em Star Wars :D</h3>
                <List>
                    {
                        this.props.ranking.map((gamer) => {
                            return (
                                <ListItem primaryText={
                                    'Nome: ' + gamer.name + ' | ' + ' PONTOS: ' +  gamer.points} />
                            )
                        })
                    }
                 </List>
            </div>
        );
    }
}