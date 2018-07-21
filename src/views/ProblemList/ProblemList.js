import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const backendURL = "http://127.0.0.1:3333";

let mockUpData = [
    { problemId: 0, name: '', difficulty: '', passedCount: '' },
    { problemId: 1, name: '', difficulty: '', passedCount: '' },
    { problemId: 2, name: '', difficulty: '', passedCount: '' },
    { problemId: 3, name: '', difficulty: '', passedCount: '' },
    { problemId: 4, name: '', difficulty: '', passedCount: '' },
]

const divStyleHeightLine = {
    height: '20px'
};

class ProblemItemButton extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const difficulty = this.props.difficulty;
        return (
            <tr> 
            <td>
                <Link to={{ pathname: '/problems/' + this.props.id , state : this.props}}>
                    <div>
                        <p class="text-dark">{this.props.id}</p>
                    </div>
                </Link>        
            </td>
            <td>
                <Link to={{ pathname: '/problems/' + this.props.id , state : this.props}}>
                    <div className="text-center">
                        <p class="text-dark">{this.props.name}</p>
                    </div>
                </Link>
            </td>
            <td className="text-center">
                <Link to={{ pathname: '/problems/' + this.props.id , state : this.props}}>
                    <div className="text-center">
                    <span className={difficulty === 'Easy' ? "badge badge-success " : (difficulty === 'Medium' ? "badge badge-warning" : "badge badge-danger")}>{difficulty}</span>
                    </div>  
                </Link>
            </td>
            <td>
                <Link to={{ pathname: '/problems/' + this.props.id , state : this.props}}>
                    <div className="text-center">
                        <p className="text-justify text-center text-dark">{this.props.passed}</p>
                    </div>  
                </Link>         
            </td>                            
            </tr>
        );
    }
}
class ProblemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
        this.update();
    }    

    searchData = mockUpData;

    currentProblem(){
        this.searchData = [];
        if(this.SearchBar.value === '' && mockUpData !== null) this.searchData = mockUpData;
        else
            for(let index = 0 ; index < mockUpData.length ; index++){
                if(mockUpData[index].name.indexOf(this.SearchBar.value) >= 0
                    || mockUpData[index].problemId.toString().indexOf(this.SearchBar.value) >= 0
                    || mockUpData[index].difficulty.indexOf(this.SearchBar.value) >= 0){
                    this.searchData.push(mockUpData[index]);
                }
            }
        return (
            this.searchData
        );
    }

    handleQuery = () => {
        console.log(this.state.query);
        this.currentProblem();
    }

    handleInputChange = () => {
        this.setState({
            query: this.SearchBar.value
        })
        this.currentProblem();
    }
    
    update(){
        Axios.get(backendURL + '/list_problem/').then(res => {
            mockUpData = res.data['problems'];
            this.currentProblem();
            this.setState({});
        }).catch( (err) => {
            console.log('err: listing problem');
        });
    }

    render() {
        return (
            <div>
                <div className="container-fluid bd-content" >
                    <div style={divStyleHeightLine} />
                    <h1 className="bd-title" id="content">Problem List</h1>
                    <div style={divStyleHeightLine} />
                    <div id="custom-search-input">
                        <div className="input-group col-md-12">
                            <input ref={input => this.SearchBar = input} onChange={this.handleInputChange} type="text" className="search-query form-control" placeholder="Search" />
                            <span className="input-group-btn">
                                <button onClick={this.handleQuery} className="btn" type="button">
                                    <span className="cui-magnifying-glass" />
                                </button>
                            </span>
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="list-group">
                        <table className="table table-hover ">
                            <thead className="thead-inverse">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th className="text-center">
                                        Problem name
                                    </th>
                                    <th className="text-center">
                                        Level
                                    </th>
                                    <th className="text-center">
                                        Passed
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.searchData.map((problem) => <ProblemItemButton id={problem.problemId} name={problem.name} passed={problem.passedCount} difficulty={problem.difficulty} />)
                                }
                                <div style={{height : 100 + 'px'}}/>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

export default ProblemList