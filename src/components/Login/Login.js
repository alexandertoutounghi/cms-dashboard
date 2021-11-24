import React, {useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {

    // const emailValidator = email => {
    //     return (email.includes('@'))
    // }

    const emailReducer = (state, action) => {
        if (action.type === 'USER_INPUT')
            return {value:action.value, isValid:action.value.includes('@')};
        if (action.type === 'INPUT_BLUR')
            return {value:state.value,isValid:state.value.includes('@')};
        return {value:'', isValid:false};
    };
    const passwordReducer = (state, action) => {
        if (action.type === 'USER_INPUT')
            return {value:action.value, isValid:action.value.length > 6};
        if (action.type === 'INPUT_BLUR')
            return {value:state.value,isValid:state.value.length > 6};
        return {value:'', isValid:false};
    };

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();


    const [emailState,dispatchEmail] = useReducer(
        emailReducer,{
            value:'',
            isValid:null
        });
     const [passwordState,dispatchPassword] = useReducer(
         passwordReducer,{
            value:'',
            isValid:null
        });

    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const { isValid: emailIsValid } =emailState;
    const {isValid: passwordIsValid} =passwordState;
    useEffect(() => {

        const identifier = setTimeout(() => {
            console.log('chceking form validity')
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        //cleanup function
        //this runs first on every follow up execution
        return () => {
            console.log('cleanup')
            clearTimeout(identifier);

        };

    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({type:'USER_INPUT',value: event.target.value});
        // setEnteredEmail(event.target.value);
        // setFormIsValid(
        //   event.target.value.includes('@') && enteredPassword.trim().length > 6
        // );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type:'USER_INPUT',value: event.target.value});
        // setFormIsValid(
        //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
        // );
    };

    const validateEmailHandler = () => {
        dispatchEmail({type:'INPUT_BLUR'});
        // setEmailIsValid(emailState.isValid);
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type:'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        // props.onLogin(enteredEmail, enteredPassword);
        props.onLogin(emailState.value,passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid===false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
