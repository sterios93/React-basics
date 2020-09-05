import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    useEffect(() => {
        // It runs when the component is created
        // it runs for every update, you can use for all the things you would do in componentDidUpdate
        // http request,...
        console.log('[Cockipt.js] use effect');
        // setTimeout(() => {
        //     alert('Saved Data to cloud !')
        // }, 1000)
        toggleBtnRef.current.click();

        return () => console.log('[Cockipt.js] cleanup work in use effect')
    }, []); // That way we will call useEffect only when persons changes

    // You can have as many use effects for different props
    useEffect(() => {}, []); // That way the hook will run only once (upon creation), cus we are not observing anything, it's like componentDidMount();



    const assignedClasses = [];
    let btnClass = '';

    if (props.showPersons) btnClass = classes.Red;
    if (props.personsLength <= 2) assignedClasses.push(classes.red);
    if (props.personsLength <= 1) assignedClasses.push(classes.bold);

    return (
        <div className={classes.Cockpit}>
            <p>{props.title}</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked} >
                Switch Name
            </button>
            <button onClick={authContext.login}> Log In</button>
            <p className={assignedClasses.join(' ')}>This is really working</p>
        </div>
    )
}

export default React.memo(cockpit); // Stores a snapshot of the component, and only if it's input changes it wil re-render it
// If a property doesn't get changed, React will give back that stored component state.