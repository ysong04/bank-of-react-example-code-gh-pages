/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super();
    this.state = {
      accountBalance: 0,
      debitList: [],
      creditList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser }
    newUser.userName = logInInfo.userName
    this.setState({ currentUser: newUser })
  }

  addCredit = (creditObject) => {
    this.setState({
      creditList: [...this.state.creditList, creditObject]
    })
  }

  addDebit = (debitObject) => {
    this.setState({
      debitList: [...this.state.debitList, debitObject]
    })
  }

  calculateBalance = () => {
    let currentDebit = 0
    let currentCredit = 0
    this.state.creditList.map(credit => {
      currentCredit += parseFloat(parseFloat(credit.amount).toFixed(2))
    })
    this.state.debitList.map(debit => {
      currentDebit += parseFloat(parseFloat(debit.amount).toFixed(2))
    })
    return (currentCredit - currentDebit)
  }

  componentDidMount() {
    axios.get("https://moj-api.herokuapp.com/credits").then(res => {
      this.setState({
        creditList: res.data
      })
    }).catch(err => {
      console.log(err)
    })
    axios.get("https://moj-api.herokuapp.com/debits").then(res => {
      this.setState({
        debitList: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.creditList.length != this.state.creditList.length) || (prevState.debitList.length != this.state.debitList.length)) {
      let accountBalance = this.calculateBalance()
      this.setState({
        accountBalance
      })
    }
  }

  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} debits={this.state.debitList} addDebit={this.addDebit} />)
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance} credits={this.state.creditList} addCredit={this.addCredit} />)

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;