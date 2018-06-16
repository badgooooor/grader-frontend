import React, { Component } from 'react';

import Header from '../../components/Header/';
import Footer from '../../components/Footer/';

import { Doughnut, Line, Bar } from 'react-chartjs-2';

const lineDataStlye = {
    
    labels: [
        '1','2','3','4','5','6','7','8','9'
    ],
    datasets:[{
        label: 'Passed Person',
        data: [10, 10, 8, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#ff6384',
        borderColor: '#778899',
        fill: false
        
    
    }]
}

const barDataStlye = {
    
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

const douDataStlye = {
	labels: [
		'UnPass',
		'Pass'
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

class Home extends Component {

    state = {
        recentlyData: lineDataStlye,
        lineData: lineDataStlye,
        barData: barDataStlye,
        douData: douDataStlye,
      }

    render() {
        return(
            <div>
                <Header/>
                <div class="container-fluid" >
                <div style={divStyleHightLine}/>
                    <div class="row ">
                        <div class="col-sm-6 col-md-5 col-lg-6">
                            <div class="card" >
                                <div class="card-header">
                                    <i class="fa fa-align-justify"></i> Recently
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive" id="myDIV">
                                        <table class="table table-striped">
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
                                                    <td><span class="badge badge-success">Pass</span></td>
                                                </tr>
                                                <tr>
                                                    <td>A*B</td>
                                                    <td>2012/02/01</td>
                                                    <td><span class="badge badge-danger">Cmopile Error</span></td>
                                                </tr>
                                                <tr>
                                                    <td>A*C</td>
                                                    <td>2012/02/01</td>
                                                    <td><span class="badge badge-secondary">Memmory</span></td>
                                                </tr>
                                                <tr>
                                                    <td>A?B</td>
                                                    <td>2012/03/01</td>
                                                    <td><span class="badge badge-warning">Runtime</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-5 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fa fa-align-justify"></i> Count passed problem
                                </div>
                                <div class="card-body">
                                    <Line data={this.state.lineData} options={{ responsive: true, maintainAspectRatio: false, legend: { position: 'right' } }} width={this.props.width} height={262} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={divStyleHightLine}/>
                    <div class="row">
                        <div class="col-sm-6 col-md-5 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fa fa-align-justify"></i> Personal pass
                                </div>
                                <div class="card-body">
                                <Bar data={this.state.barData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={300} height={300} />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-5 col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <i class="fa fa-align-justify"></i> Personal processs
                                </div>
                                <div class="card-body">
                                <Doughnut data={this.state.douData} options={{ maintainAspectRatio: false, legend: { position: 'right' } }} width={300} height={300} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footerSpace" style={divStyleHight}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home