import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import {News} from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 10;
  apikey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <>
      <Router>
        <div>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<News  apiKey = {this.apikey} key="general" pagesize={this.pageSize} country='in' category='general'/>}></Route>
          <Route exact path='/sports' element={<News  apiKey = {this.apikey} key="sports" pagesize={this.pageSize} country='in' category='sports'/>}/>
          <Route exact path='/health' element={<News  apiKey = {this.apikey} key="health" pagesize={this.pageSize} country='in' category='health'/>}/>
          <Route exact path='/science' element={<News  apiKey = {this.apikey} key="science" pagesize={this.pageSize} country='in' category='science'/>}/>
          <Route exact path='/technology' element={<News  apiKey = {this.apikey} key="technology" pagesize={this.pageSize} country='in' category='technology'/>}/>
          <Route exact path='/business' element={<News  apiKey = {this.apikey} key="business" pagesize={this.pageSize} country='in' category='business'/>}/>
          <Route exact path='/entertainment' element={<News  apiKey = {this.apikey} key="entertainment" pagesize={this.pageSize} country='in' category='entertainment'/>}/>
          <Route exact path='/general' element={<News apiKey = {this.apikey}  key="general" pagesize={this.pageSize} country='in' category='general'/>}/>
        </Routes>        
        </div>
        
      </Router>
      </>
    )
  }
}
