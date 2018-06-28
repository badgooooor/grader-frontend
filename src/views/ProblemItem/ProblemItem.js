import React, { Component } from 'react';


const divStyleHightLine = {
    height: '20px'
};

const divStyleHight = {
    height: '160px'
};

const problemDetail = {
    id: 0,
    name: '2+2=4',
    detail: 'This problem is an easy one: given integer a and b, calculate a+b.    ',
}
const problemCases = [
    { input: '1 2', output: '3' },
    { input: '2 2', output: '4' },
    { input: '5 4', output: '9' }
]

class DetailsCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        <i className="fa fa-align-justify">#{this.props.problem.id}</i>
                    </div>
                    <i className="fa fa-align-justify">{this.props.problem.name}</i>
                </div>
                <div className="card-body">
                    {this.props.problem.detail}
                </div>
            </div>
        );
    }
}

class TestItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.input}</td>
                <td>{this.props.output}</td>
            </tr>
        );
    }
}

class TestCase extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="col-sm-2 col-md-2 col-lg-2">
                        Test Cases
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th>Input</th>
                                <th>Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TestItem input={ problemCases[0].input } output={ problemCases[0].output}/>
                            <TestItem input={ problemCases[1].input } output={ problemCases[1].output}/>
                            <TestItem input={ problemCases[2].input } output={ problemCases[2].output}/>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


class ProblemList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const probs = this.props.location.state;
        const problem = problemDetail;
        return (
            <div>
                <div className="container-fluid" >
                    <div style={divStyleHightLine} />
                    <div className="row ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <DetailsCard problem={probs} />
                            <TestCase />   
                            
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Submission
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <button type="button" className="btn btn-block btn-primary ">File</button>
                                        </div>
                                        <div className="col-sm-8 col-md-8 col-lg-8 d-flex align-items-center">
                                            <div className="progress" style={{ height: 30 + 'px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: 0 + '%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={divStyleHightLine} />
                                    <div className="row ">
                                        <div className="col-sm-8 col-md-8 col-lg-8" />
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <button type="button" className="btn btn-block btn-success ">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Result
                                </div>
                                <div className="card-body ">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footerSpace" style={divStyleHight} />
                </div>
            </div>
        );
    }
}

export default ProblemList