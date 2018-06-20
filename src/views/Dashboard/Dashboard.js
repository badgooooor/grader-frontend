import React, { Component } from 'react';

import { Doughnut, Line, Bar } from 'react-chartjs-2';



// Data.
const lineDataStyle = {
    
    labels: [
        '1','2','3','4','5','6','7','8','9'
    ],
    datasets:[{
        label: 'Passed',
        data: [9, 10, 8, 4, 5, 2, 3, 4, 1],
        backgroundColor: '#ff6384',
        borderColor: '#778899',
        fill: false
        
    
    }]
}

const barDataStyle = {
    
    labels: [
        '1','2','3','4','5','6','7','8','9'
    ],
    datasets:[{
        label: 'case',
        data: [10, 10, 8, 6, 4, 3, 9, 10, 3],
        backgroundColor: '#ff6384',
        borderColor: '#778899',
        fill: false
        
    
    }]
}

const donutDataStyle = {
	labels: [
		'Not Passed',
		'Passed'
	],
	datasets: [{
		data: [5, 7],
		backgroundColor: [
        'rgba(230,255, 230, 0.7)',
		'#33ff33',
		],
		hoverBackgroundColor: [
        'rgba(230, 255, 230, 0.7)',
		'#33ff33',
		]
	}]
};



const divStyleHeightLine = {
    height: '20px'
  };

const divStyleHeight = {
    height: '160px'
};

class Dashboard extends Component {
    state = {
        recentlyData: lineDataStyle,
        lineData: lineDataStyle,
        barData: barDataStyle,
        douData: donutDataStyle,
        
        
    }

    render() {
        return(
            <div>
                <div className="container-fluid" >
                <div style={divStyleHeightLine}/>
                    <div className="row ">
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Username
                                </div>
                                <div className="card-body">
                                <Doughnut data={this.state.douData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} height={262} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Submission
                                </div>
                                <div className="card-body">
                                    <Line data={this.state.lineData} options={{ responsive: true, maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} height={262} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <div className="card" >
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Recently Process
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive" id="myDIV">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Problem</th>
                                                    <th>Time</th>
                                                    <th>Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>A+B</td>
                                                    <td>2012/01/01</td>
                                                    <td><span className="badge badge-success">Pass</span></td>
                                                </tr>
                                                <tr>
                                                    <td>A*B</td>
                                                    <td>2012/02/01</td>
                                                    <td><span className="badge badge-danger">Compile Error</span></td>
                                                </tr>
                                                <tr>
                                                    <td>A*C</td>
                                                    <td>2012/02/01</td>
                                                    <td><span className="badge badge-secondary">Memory</span></td>
                                                </tr>
                                                <tr>
                                                    <td>A?B</td>
                                                    <td>2012/03/01</td>
                                                    <td><span className="badge badge-warning">Runtime Error</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-3 col-lg-4 ">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Personal passed task
                                </div>
                                <div className="card-body ">
                                <Bar data={this.state.barData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} height={262} />
                                </div>
                            </div>
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
                                                    <th><span class="cui-check"/></th>
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
                    <div className="footerSpace" style={divStyleHeight}/>
                </div>
            </div>
        );
    }
}

export default Dashboard