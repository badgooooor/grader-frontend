import React, { Component } from 'react';


const divStyleHightLine = {
    height: '20px'
  };

const divStyleHight = {
    height: '160px'
};

let Detail = <i>This problem is an easy one: given integer a and b, calculate a+b.</i>
let tempTaseCase =  <tr>
                        <th>1 2</th>
                        <th>3</th>
                    </tr>

class ProblemList extends Component {

    render() {
        return(
            <div>
                <div className="container-fluid" >
                <div style={divStyleHightLine}/>
                    <div className="row ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div className="card">
                                <div className="card-header">
                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                        <i className="fa fa-align-justify"></i> #000000
                                    </div>
                                    <i className="fa fa-align-justify"></i> A+B
                                </div>
                                <div className="card-body">
                                    {Detail}
                                </div>
                            </div>
                            <div className="card" >
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Tase case
                                </div>
                                <div class="card-body">
                                    <table class="table table-responsive-sm">
                                    <thead>
                                        <tr>
                                            <th>Input</th>
                                            <th>Output</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {tempTaseCase}
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <div className="col-sm-2 col-md-4 col-lg-6"/>
                                        <div className="col-sm-6 col-md-4 col-lg-2">
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#">Prev</a>
                                                </li>
                                                <li class="page-item active">
                                                    <a class="page-link" href="#">1</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#">2</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#">3</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#">4</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#">Next</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Submission
                                </div>
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <button type="button" class="btn btn-block btn-primary ">File</button>
                                    </div>
                                    <div className="col-sm-8 col-md-8 col-lg-8 d-flex align-items-center">
                                        <div class="progress" style={{height: 30+'px'}}>
                                            <div class="progress-bar" role="progressbar" style={{width: 0+'%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                                <div style={divStyleHightLine}/>
                                <div className="row ">
                                    <div className="col-sm-8 col-md-8 col-lg-8"/>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <button type="button" class="btn btn-block btn-success ">Send</button>
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
                    <div className="footerSpace" style={divStyleHight}/>
                </div>
            </div>
        );
    }
}

export default ProblemList