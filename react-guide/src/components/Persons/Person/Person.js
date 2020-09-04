import React, { Component } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Auxiliary';

class Person extends Component {
    
    render() {
        console.error('[Person.js] rendering');
        // Instead of Aux custom component we can use React.Fragment it does the same thing
        return (
            <Aux>
            {/* <div className={classes.Person}> */}
                <p onClick={this.props.click}> I'm a {this.props.name} and I'm {this.props.age} years old! </p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            {/* </div> */}
            </Aux>
        )
    }
};

export default Person;