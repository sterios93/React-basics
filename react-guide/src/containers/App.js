import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'asd', name: 'Max', age: 30 },
      { id: 'asddd', name: 'Stery', age: 20 },
    ],
    other: 'other',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  /**
   * It should return your updated state
   * @param {*} props 
   * @param {*} state 
   */
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromPorps ', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount'); 
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate'); 
  }

  nameChangedHandler = (event, id) => {
    // Why we do this update like that
    // here we are creating a new object/array whatever we need
    // and when we update the state with the new object, it changes the pointer refference
    // which from the other side, signals to all the components using that property in whaterver hook, lifecycle etc, 
    // that there is a change and if we compare the nextState with the currentState, the pointers don't match and we can easily do the update.
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    // make a copy of the searched person
    const person = { ...this.state.persons[personIndex]};
    // change the name of the copy
    person.name = event.target.value;

    // make a copy to the persons array
    const persons = [...this.state.persons];
    // assign the newly created person to the desired idnex
    persons[personIndex] = person;


    // When updating the state, depending on the old state, you can pass a function with prevState param for refference
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons; 
    this.setState({
      showPersons: !doesShow
    })
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] render')
    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons
           persons={this.state.persons}
           clicked={this.deletePersonHandler}
           changed={this.nameChangedHandler}
           isAuthenticated = {this.state.authenticated}
           />;
    }

    return (
      <Aux>
          <button onClick={() => this.setState({ showCockpit: !this.state.showCockpit})}>Remove Cockpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
          >
            {
              this.state.showCockpit ?
              <Cockpit
                personsLength={this.state.persons.length}
                showPersons={this.state.showPersons}
                clicked={this.togglePersonsHandler}
                title={this.props.title}
              /> : null
            }
            {persons}
          </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);