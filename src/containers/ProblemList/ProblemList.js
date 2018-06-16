import React, { Component } from 'react';

import Header from '../../components/Header/';
import Footer from '../../components/Footer/';

const divStyleHightLine = {
    height: '20px'
  };

const divStyleHight = {
    height: '160px'
};

const button = <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
<hhh>100</hhh>
Problem name
<span class="badge badge-danger">Hard</span>
<hhh>100</hhh>
</button>

class Home extends Component {

    render() {
        return(
            <div>
                <Header/>
                
                <div class="container-fluid bd-content" >
                <div style={divStyleHightLine}/>
                <h1 class="bd-title" id="content">Problem List</h1>
                <div style={divStyleHightLine}/>
                    <div id="custom-search-input">
                        <div class="input-group col-md-12">
                            <input type="text" class="  search-query form-control" placeholder="Search" />
                            <span class="input-group-btn">
                                <button class="btn" type="button">
                                    <span class="cui-magnifying-glass"/>
                                </button>
                            </span>
                        </div>    
                    </div>
                <div style={divStyleHightLine}/>
                    <div class="list-group">
                        <button type="button" class=" list-group-item list-group-item-action active disabled d-flex justify-content-between align-items-center">
                            <h3>#</h3>
                            <h3>Problem name</h3>
                            <span class="badge badge-light">Level</span>
                            <h3>Passed</h3>
                        </button>
                        {button}
                        {button}
                        {button}
                        {button}
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home