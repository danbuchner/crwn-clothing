import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      // userAuth - Getting back an authenticated user object
      if(userAuth){
        // calling the method to see if the snapshot from db has changed
        // with new data for the user
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          /* DocumentSnapshot is retrieved from documentReference
            - allow to check if document exists by calling the .exists property
            - .data() method, returns a JSON with the actual properties
               #we don't get any data until we call the .data() method#
          */
        setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
        
      }else{
        // When the user logout the code will set the currentUser to null
        // in this case userAuth will be null
        setCurrentUser(userAuth);
      }      
    });   
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' 
          render={ () => 
            this.props.currentUser ? 
            (
              <Redirect to='/' />
            ) : ( 
              <SignInAndSignUpPage />
            )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
