import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,signInWithGoogle} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    /**
     * Handle sign in with user and password
     * @param {*} event 
     */

    handleSubmit = async event => {
        event.preventDefault();

        // Deconstruct email and password from state
        const { email, password } = this.state;

        try{
            // Calls the method form the auth library 
            // to sign in with email and password
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                email:'',password:''
            });

        } catch(error) {
            // Log in the console if any error occur
            console.error(error);
        }

        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({[name]: value});
    }

    render(){
        return (
            <div className='sign-in'>
                <h2> I already have an account</h2>
                <span>Sign in with you email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name ='email' 
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    label='email'
                    required />

                    <FormInput name ='password' 
                    type='password'
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    label='password'
                    required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}
                            Sign in with Google {' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;