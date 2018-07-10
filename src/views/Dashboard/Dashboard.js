import React, { Component } from 'react';
import Axios from 'axios';

import { Doughnut, Line, Bar } from 'react-chartjs-2';



// Mock-up Data.
const mockUser = {
    username: 'borbier',
    submission: [
        { id: 1, passed: true, submitCount: 4 },
        { id: 3, passed: false, submitCount: 5 },
        { id: 4, passed: false, submitCount: 6 }
    ],
}
const submitCount = {

}
// Get only user's submission.
const mockLog = [
    { submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '2', result: 'PPPPP' },
    { submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '3', result: 'PP--P' },
    { submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '4', result: 'PPP--' },
    { submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '12', result: 'Timeout' },
    { submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '20', result: 'Memory' },
    { submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '2', result: 'Compile' },
    { submitId: '12345', time: '18:19 18/06/60', user: 'bier', problemId: '2', result: 'PPPPP' },
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
        '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ],
    datasets: [{
        label: 'case',
        data: [10, 10, 8, 6, 4, 3, 9, 10, 3],
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
        data: [5, 6],
        backgroundColor: [
            'rgba(230,255, 230, 0.7)',
            '#33ff33',
        ],
        hoverBackgroundColor: [
            'rgba(230, 255, 230, 0.7)',
            '#33ff33',
        ]
    }]

}

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

    getUserSolvedCount() {
        let passCount = 0;
        this.state.user.submission.map((problem) => {
            if (problem.passed) passCount++;
        })
        let failedCount = this.state.user.submission.length - passCount
        let tempData = [failedCount, passCount]
        this.state.douData.datasets[0].data = tempData
    }

    render() {
        this.getUserSolvedCount();
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
          5000
        )
      }
    
      componentWillUnmount() {
        clearInterval(this.timer)
      }

    getAllPassedCount(){
        let allPassedCount = [];
        let allLabel = [];
        let problemAmount = 0;

        Axios.get('http://127.0.0.1:3333/list_problem/').then(res => {
            problemAmount = res.data['problems'].length;
            
            for(let id = 0; id < problemAmount; id++){
                let link = 'http://127.0.0.1:3333/get_problem/'+ id.toString();
                    Axios.get(link)
                    .then(res => {
                        allLabel.push(id.toString());
                        allPassedCount.push(res.data[0]['passedCount']);

                        if(id == problemAmount - 1)
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

                    }).catch( (err) => {
                        console.log('err: pushing problem detail');
                    });
            }
            
            
        }).catch( (err) => {
                console.log('err: listing problem');
        });
    }

    render(){
        console.log(this.state.lineData)
        console.log(lineDataStyle)
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

class UserSubmitCount extends Component {
    state = {
        user: mockUser,
        barData: barDataStyle,
        getUserSubmitCount: this.getUserSubmitCount.bind(this)
    }

    getUserSubmitCount() {
        let problemId = []
        let submitCount = []
        this.state.user.submission.map((problem) => {
            problemId.push(problem.id)
            submitCount.push(problem.submitCount)
        })
        this.state.barData.labels = problemId;
        this.state.barData.datasets[0].data = submitCount;
    }

    render() {
        this.getUserSubmitCount();
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
                <td>{this.props.problemId}</td>
                <td>{this.props.result}</td>
            </tr>
        );
    }
}
class SubmitTable extends Component {
    render() {
        const submitLog = mockLog;
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
                                    submitLog.map((log, i) => <LogElement submitId={log.submitId} problemId={log.problemId} time={log.time} result={log.result} />)
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

    render() {
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
                            <UserSubmitCount />
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