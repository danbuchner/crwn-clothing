import React from 'react';
import {Switch,Route} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    
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
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
        
      }else{
        // When the user logout the code will set the currentUser to null
        // in this case userAuth will be null
        this.setState({currentUser: userAuth});
      }      
    });   
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
