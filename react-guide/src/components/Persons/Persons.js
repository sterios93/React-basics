import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromPorps ', props);
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState) {
        // If the parent component updates / renders, our component wil rerender too, here is how we can prevent it
        // We must check a prop which we will observe for changes
        // If we need to watch out for all the props, there is no need to write manualy all the checks somply use PureComponent
        // if (nextProps.persons !== this.props.persons) return true
        // else return false
        // Return true or false, you can compare the current props, to the next props
        // console.log('[Persons.js] shouldComponentUpdate ');
        // return true;
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate ');
        return { message: 'Snapshot !'};
    }

    componentDidUpdate(prevProps, prevstate, snapshot) {
        console.log('[Persons.js] componentDidUpdate ');
        console.log(snapshot);
    }

    componentWillUnmount() {
        // Used for cleanups 
        console.log('[Persons.js] componentWillUnmount ');
    }

    render() {
        console.log('[Persons.js] rendering');
        return (
            this.props.persons.map((person, index) => {
                return (
                    <Person
                        name={person.name}
                        age={person.age}
                        click={() => this.props.clicked(index)}
                        changed={(event) => this.props.changed(event, person.id)}
                        key={person.id}
                    />
                )
            })
        )

    }
}


export default Persons;