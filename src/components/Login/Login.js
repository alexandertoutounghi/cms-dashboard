import React, {useContext, useEffect, useReducer, useState, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

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
    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
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
        if (formIsValid)
            authCtx.onLogin(emailState.value,passwordState.value);
        else if (!emailIsValid)
            emailInputRef.current.focus();
        else
            passwordInputRef.current.focus();

        // props.onLogin(enteredEmail, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    type={'email'}
                    id={'email'}
                    label={'E-Mail'}
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler} />
                <Input
                    ref={passwordInputRef}
                    type={'password'}
                    id={'password'}
                    label={'Password'}
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler} />

                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
