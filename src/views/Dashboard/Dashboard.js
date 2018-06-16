import React, { Component } from 'react';

import { Doughnut, Line, Bar } from 'react-chartjs-2';

const lineDataStlye = {
    
    labels: [
        '1','2','3','4','5','6','7','8','9'
    ],
    datasets:[{
        label: 'Passed Persons',
        data: [10, 10, 8, 0, 0, 0, 0, 0, 0],
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
        data: [10, 10, 8, 0, 0, 0, 0, 0, 0],
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



const divStyleHightLine = {
    height: '20px'
  };

const divStyleHight = {
    height: '160px'
};

class Dashboard extends Component {

    state = {
        recentlyData: lineDataStlye,
        lineData: lineDataStlye,
        barData: barDataStyle,
        douData: donutDataStyle,
      }

    render() {
        return(
            <div>
                <div className="container-fluid" >
                <div style={divStyleHightLine}/>
                    <div className="row ">
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <div className="card" >
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Recently
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
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Count passed problem
                                </div>
                                <div className="card-body">
                                    <Line data={this.state.lineData} options={{ responsive: true, maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} height={262} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={divStyleHightLine}/>
                    <div className="row">
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Personal pass
                                </div>
                                <div className="card-body">
                                <Bar data={this.state.barData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={300} height={300} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-5 col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Personal processs
                                </div>
                                <div className="card-body">
                                <Doughnut data={this.state.douData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={300} height={300} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footerSpace" style={divStyleHight}/>
                </div>
            </div>
        );
    }
}

export default Dashboard