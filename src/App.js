import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import { Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Footer from './components/Footer/Footer.js'
import Header from './components/Header/Header.js'
const Home = () => <h1>Home</h1>
const About = () => <h1>About</h1>
const Post = () => <h1>Post</h1>
const Project = () => <h1>Project</h1>

class App extends Component {
  render() {
    return (
      <div className="my-app">
      
      <Header />
      <div className="App container">
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/post" component={Post} />
        <Route path="/project" component={Project} />
      </div>
      
      <Footer />
    </div>
    );
  }
}

export default App;
