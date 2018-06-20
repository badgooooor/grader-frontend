import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const mockUpData = [
    { id: 1, name: 'A+B', difficulty: 'Easy', passed: 143 },
    { id: 2, name: 'Recursive', difficulty: 'Hard', passed: 12 },
    { id: 3, name: 'A^B', difficulty: 'Medium', passed: 45 },
    { id: 4, name: 'Grading', difficulty: 'Easy', passed: 73 },
    { id: 5, name: 'SmartCamp', difficulty: 'Hard', passed: 121 },
]

const divStyleHeightLine = {
    height: '20px'
};

class ProblemItemButton extends Component {
    render() {
        const difficulty = this.props.difficulty;
        return (
            <Link to={{ pathname: '/problems/:id' }}>
                <button type="button" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <p>{this.props.id}</p>
                    {this.props.name}
                    <span className={difficulty === 'Easy' ? "badge badge-success" : (difficulty === 'Medium' ? "badge badge-warning" : "badge badge-danger")}>{difficulty}</span>
                    <p>{this.props.passed}</p>
                </button>
            </Link>
        );
    }
}


class SearchBar extends Component {
    state = {
        query: ''
    }
    handleQuery = () => {
        console.log(this.state.query);
    }
    handleInputChange = () => {
        this.setState({
            query: this.SearchBar.value
        })
    }
    render() {
        return (
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
        );
    }
}

class ProblemList extends Component {
    render() {
        const problemList = mockUpData;
        return (
            <div>
                <div className="container-fluid bd-content" >
                    <div style={divStyleHeightLine} />
                    <h1 className="bd-title" id="content">Problem List</h1>
                    <div style={divStyleHeightLine} />
                    <SearchBar />
                    <div style={divStyleHeightLine} />
                    <div className="list-group">
                        <button type="button" className="list-group-item list-group-item-action active disabled d-flex justify-content-between align-items-center">
                            <h3>#</h3>
                            <h3>Problem name</h3>
                            <h3>Level</h3>
                            <h3>Passed</h3>
                        </button>
                        <ProblemItemButton id="0" name="test" passed="100" difficulty="Easy" />
                        {
                            problemList.map((problem, i) => <ProblemItemButton id={i} name={problem.name} passed={problem.passed} difficulty={problem.difficulty} />)
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default ProblemList