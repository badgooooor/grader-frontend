import React, { Component } from 'react';

const divStyleHeightLine = {
    height: '20px'
  };

const divStyleHeight = {
    height: '160px'
};

const button = <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <hhh>100</hhh>
                    Problem name
                    <span className="badge badge-danger">Hard</span>
                    <hhh>100</hhh>
                </button>

class ProblemList extends Component {

    render() {
        return(
            <div>
                <div className="container-fluid bd-content" >
                <div style={divStyleHeightLine}/>
                <h1 className="bd-title" id="content">Problem List</h1>
                <div style={divStyleHeightLine}/>
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                            <input type="text" className="search-query form-control" placeholder="Search" />
                            <span className="input-group-btn">
                                <button className="btn" type="button">
                                    <span className="cui-magnifying-glass"/>
                                </button>
                            </span>
                        </div>    
                    </div>
                <div style={divStyleHeightLine}/>
                    <div className="list-group">
                        <button type="button" className="list-group-item list-group-item-action active disabled d-flex justify-content-between align-items-center">
                            <h3>#</h3>
                            <h3>Problem name</h3>
                            <h3>Level</h3>
                            <h3>Passed</h3>
                        </button>
                        {button}
                        {button}
                        {button}
                        {button}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ProblemList