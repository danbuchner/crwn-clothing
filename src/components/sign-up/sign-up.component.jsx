import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    /**
     * This will prevent from submitting the form 
     * and the code wil handle user creation
     * @param {*} event 
     */
    handleSubmit = async event => {
        event.preventDefault();

        // deconstruct the fields from the state
        const {displayName, email, password, confirmPassword } = this.state;

        // Check if password and confirmation matches
        if(password != confirmPassword){
            // if passwords do not match alert the user
            // and prevent creating the user
            alert("Passwords don't match");
            return;
        }

        try{
            // createUserWithEmailAndPassword() from firebase Auth library
            // after the user has been created with the data provided by the user
            // this method will return an authUser object
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            
            await createUserProfileDocument(user,{displayName});
            // wait until the create user profile methos is completed
            // and then set the state
            this.setState(
                {
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }
            );
        }catch(error){
            // Log any error while creating users
            console.error(error);

        }
        
    }

    /**
     * This will handle the change form the form input component
     * @param {*} event 
     */
    handleChange = event => {
        // deconstruct the name and value from the form input obj
        const { name, value} = event.target;

        // will assing the value to the state property
        // it can handle dynamic properties
        this.setState({[name]:value});
    }

    render(){
        const {displayName, email, password,confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'/>
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'/>    
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'/>
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'/>

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        );

    }
}

export default SignUp;