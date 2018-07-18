import React, { Component } from 'react';
import Axios from 'axios';

import { Doughnut, Line, Bar } from 'react-chartjs-2';

var CryptoJS = require("crypto-js");

const backendURL = "http://127.0.0.1:3333";
// Mock-up Data.
var mockUser = {
    username: '',
    problemSolved: [ ],
}
const submitCount = {

}
// Get only user's submission.
let mockLog = [
    //{ submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '2', result: 'PPPPP' },
    //{ submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '3', result: 'PP--P' },
    //{ submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '4', result: 'PPP--' },
    //{ submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '12', result: 'Timeout' },
    //{ submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '20', result: 'Memory' },
    //{ submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '2', result: 'Compile' },
    //{ submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '2', result: 'PPPPP' },
]

// Data + style in charts.
const lineDataStyle = {
    labels: [
        
    ],
    datasets: [{
        label: 'Passed',
        data: [],
        backgroundColor: '#ff6384',
        borderColor: '#778899',
        fill: false


    }]
}

const barDataStyle = {

    labels: [
       // '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ],
    datasets: [{
        label: 'case',
        data: [/*10, 10, 8, 6, 4, 3, 9, 10, 3*/],
        backgroundColor: '#ff6384',
        borderColor: '#778899',
        fill: false


    }]
}

var donutData = {
    labels: [
        'Not Passed',
        'Passed'
    ],
    datasets: [{
        data: [/*5, 6*/],
        backgroundColor: [
            'rgba(230,255, 230, 0.7)',
            '#33ff33',
        ],
        hoverBackgroundColor: [
        //    'rgba(230, 255, 230, 0.7)',
            '#33ff33',
        ]
    }]

}

let problems;

//stlye
const divStyleHeightLine = {
    height: '20px'
};

const divStyleHeight = {
    height: '160px'
};

class UserCard extends Component {
    state = {
        user: mockUser,
        douData: donutData,
        getUserSolvedCount: this.getUserSolvedCount.bind(this)
    }

    componentDidMount() {
        this.timer = setInterval(
          () => this.getUserSolvedCount(),
          2000
        )
    }
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getUserSolvedCount() {
        this.setState({
            user: Object.assign({}, this.state.user, {
                username: mockUser['username'],
                problemSolved: mockUser['problemSolved']
            })
        });
        let passCount = 0;
        if(this.state.user.problemSolved != null)
        this.state.user.problemSolved.map((problem) => {
            if (problem.solved) passCount++;
        })
        let failedCount = problems['problems'].length - passCount;
        let tempData = [failedCount, passCount];
        this.state.douData.datasets[0].data = tempData;
    }

    render() {
        return (
            <div className="col-sm-6 col-md-5 col-lg-6">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-align-justify"></i> {this.state.user.username}
                    </div>
                    <div className="card-body">
                        <Doughnut data={this.state.douData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} height={262} />
                    </div>
                </div>
            </div>
        );
    }
}

class SubmissionCard extends Component{

    constructor(props){
        super(props)
        this.state = {
            lineData: lineDataStyle,
            cardName: 'Submission'
        }
        this.getAllPassedCount = this.getAllPassedCount.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(
          () => this.getAllPassedCount(),
          1000
        )
    }
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getAllPassedCount(){
        let allPassedCount = [];
        let allLabel = [];

        if(problems != null)
            for(let id = 0; id < problems['problems'].length; id++){
                allLabel.push(id.toString());
                allPassedCount.push(problems['problems'][id]['passedCount']);
                
            }
        this.setState({
            lineData: Object.assign({}, this.state.lineData, {
                labels: allLabel,
                datasets: [{
                    label: 'Passed',
                    data: allPassedCount,
                    backgroundColor: '#ff6384',
                    borderColor: '#778899',
                    fill: false
                }]
            })
        });
    }

    render(){
        return(
        <div className="col-sm-6 col-md-5 col-lg-6">
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-align-justify"></i> {this.state.cardName}
                </div>
                <div className="card-body">
                    <Line data={this.state.lineData} options={{ responsive: true, maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} onChange={this.changeHandler} height={262} />
                </div>
            </div>
        </div>
        );                  
    }
}

class UserSolvedCount extends Component {
    state = {
        user: mockUser,
        barData: barDataStyle,
        getUserSubmitCount: this.getUserSolvedCount.bind(this)
    }

    componentDidMount() {
        this.timer = setInterval(
          () => this.getUserSolvedCount(),
          2000
        )
    }
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    getUserSolvedCount() {
        this.setState({
            user: Object.assign({}, this.state.user, {
                username: mockUser['username'],
                problemSolved: mockUser['problemSolved']
            })
        });

        let problemId = []
        let solveCount = []
        if(this.state.user.problemSolved != null)
            this.state.user.problemSolved.map((problem) => {
                problemId.push(problem.id)
                solveCount.push(problem.solveCount)
            })
        this.state.barData.labels = problemId;
        this.state.barData.datasets[0].data = solveCount;
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-align-justify"></i> Personal passed task
                                </div>
                <div className="card-body ">
                    <Bar data={this.state.barData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} height={262} />
                </div>
            </div>
        );
    }
}
class LogElement extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.submitId}</td>
                <td>{this.props.time}</td>
                <td>{problems['problems'][this.props.problemId]['name']}</td>
                <td>{this.props.result}</td>
            </tr>
        );
    }
}
class SubmitTable extends Component {

    state = {
        log : mockLog
    }

    componentDidMount() {
        this.timer = setInterval(
          () => this.update(),
          2000
        )
    }
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    update(){
        this.setState({
            log: Object.assign({}, this.state.log, {
                log : mockLog
            })
        });
    }


    render() {
        return (
            <div className="card" >
                <div className="card-header">
                    <i className="fa fa-align-justify"></i> Recently Process
                </div>
                <div className="card-body">
                    <div className="table-responsive" id="myDIV">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Time</th>
                                    <th>Problem</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mockLog.map((log, i) => <LogElement submitId={log.submitId} problemId={log.submitProblem} time={log.submitTime} result={log.result} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

class Dashboard extends Component {
    state = {
        recentlyData: lineDataStyle,
        barData: barDataStyle,
    }

    componentDidMount() {
        this.timer = setInterval(
          () => this.update(),
          5000
        )
    }
    
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    decryptPlainText(text){
        return CryptoJS.AES.decrypt(text,'secret key 123nbt').toString(CryptoJS.enc.Utf8)
    }
    
    update(){
        mockUser['username'] = this.decryptPlainText(localStorage.getItem('U2FsdGVkX1+mSZ68YZV2YQ9pMNgBL/UQj1YOjaAxZn0='));
        Axios.get(backendURL + '/get_user/' + mockUser['username']).then(res => {
            mockUser = res.data[0];
        }).catch( (err) => {
                console.log('err: listing problem');
        });
        Axios.get(backendURL + '/list_problem/').then(res => {
            problems = res.data;
        }).catch( (err) => {
                console.log('err: listing problem');
        });
        Axios.get(backendURL + '/list_user_submit/'+ mockUser['username']).then(res => {
            mockLog = res.data['logData'];  
            if(mockLog.length > 5)
                mockLog = mockLog.slice(1,5);  
        }).catch( (err) => {
                console.log('err: listing problem');
        });

    }

    render() {
        this.update();
        return (
            <div>
                <div className="container-fluid" >
                    <div style={divStyleHeightLine} />
                    <div className="row ">
                        <UserCard />
                        <SubmissionCard />
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <SubmitTable />
                        </div>
                        <div className="col-sm-4 col-md-3 col-lg-4 ">
                            <UserSolvedCount />
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2">
                            <div className="card" >
                                <div className="card-header d-flex justify-content-center">
                                    <i className="fal fa-align-center"></i> Top
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive" id="myDIV">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>User</th>
                                                    <th><span class="cui-check" /></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Franxx</td>
                                                    <td>99</td>
                                                </tr>
                                                <tr>
                                                    <td>Franxx</td>
                                                    <td>99</td>
                                                </tr>
                                                <tr>
                                                    <td>Franxx</td>
                                                    <td>99</td>
                                                </tr>
                                                <tr>
                                                    <td>Franxx</td>
                                                    <td>99</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footerSpace" style={divStyleHeight} />
                </div>
            </div>
        );
    }
}

export default Dashboard