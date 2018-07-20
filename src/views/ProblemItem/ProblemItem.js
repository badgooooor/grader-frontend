import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert'; 
import { DotLoader } from 'react-spinners';
var CryptoJS = require("crypto-js");
const backendURL = "http://127.0.0.1:3333";

const divStyleHightLine = {
    height: '20px'
};

const divStyleHight = {
    height: '160px'
};

let problemDetail = {
    //id: 0,
    //name: '2+2=4',
    //detail: 'This problem is an easy one: given integer a and b, calculate a+b.    ',
    //reqInput: 'Two integers',
    //reqOutput: 'Sum of inputs as integer'
}

let problemCases = [
    { input: '', output: '' },
    { input: '', output: '' },
    { input: '', output: '' }
]

class DetailsCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.problem);
        return (
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-align-justify">#{this.props.problem['problemId']}</i>
                    <div className="col">
                        <i className="fa fa-align-justify">{this.props.problem['name']}</i>    
                    </div>    
                </div>
                <div className="card-body">
                    <p>{this.props.problem['description']}</p>
                    <p>Input  : {this.props.problem['reqInput']}</p>
                    <p>Output : {this.props.problem['reqOutput']}</p>
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
    constructor(props) {
        super(props);   
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">Test Cases</div>
                <div className="card-body">
                    <table className="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th>Input</th>
                                <th>Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TestItem input={ problemCases[0]['input'] } output={ problemCases[0]['output']}/>
                            <TestItem input={ problemCases[1]['input'] } output={ problemCases[1]['output']}/>
                            <TestItem input={ problemCases[2]['input'] } output={ problemCases[2]['output']}/> 
                        </tbody>
                    </table>
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
                <td>{this.props.name}</td>
                <td>{this.props.result}</td>
            </tr>
        );
    }
}

class SubmitTable extends Component {

    state = {
        log : this.props.mockLog
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
                                    <th>Sender</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.log.map((log, i) => <LogElement submitId={log.submitId} name={log.sender} time={log.submitTime} result={log.result} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

class ProblemItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problem : {},
            mockLog : [{}],
            uploadedCode : '',
            outputCase : [],
            result : {},
            loading: false
        }
        this.update();
    }

    decryptPlainText(text){
        return CryptoJS.AES.decrypt(text,'secret key 123nbt').toString(CryptoJS.enc.Utf8)
    }
    
    uploadfile = (e) => {
        console.log('test');
        var input = e.target;
        var reader = new FileReader();
        reader.onload = () => this.setState({
            uploadedCode: reader.result
        });
        reader.readAsText(input.files[0]);
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        
        // console.log(files);

    }

    sendTestCase(caseIndex, output){
        console.log(caseIndex);
        if((caseIndex < this.state.problem['testCase'].length) && (this.state.problem['testCase'][caseIndex]['input'] !== '')){
            Axios.post(backendURL + '/judge', {
                    source: this.state.uploadedCode,
                    input : this.state.problem['testCase'][caseIndex]['input']
                }).then((ms) => {
                    output.push(ms['data']);
                    console.log(caseIndex)
                    this.sendTestCase(caseIndex+1, output)
                }).catch((ms) => {
                    console.log(caseIndex)
                    swal("Upload failed!", "error");
                    return []
                });
        }
        else{
            this.setState({
                loading: false
            })
            console.log(output);
            console.log(output.length);
            let caseResult = '';
            for(let i = 0; i < output.length; i++){
                console.log(output[i]['stdout'] + ' '+ this.state.problem['testCase'][i]['output']);
                if(output[i]['stdout'] === this.state.problem['testCase'][i]['output']){
                    caseResult += 'P';
                }
                else{
                    caseResult += '-';
                }
            }
            Axios.post(backendURL + '/add_submitlog', {
                    sender: this.decryptPlainText(localStorage.getItem('U2FsdGVkX1+mSZ68YZV2YQ9pMNgBL/UQj1YOjaAxZn0=')),
                    submitProblem: this.state.problem['problemId'],
                    result: caseResult,
                    processTime: output[output.length -1]['time'],
                    processMemory: output[output.length -1]['memory']
                }).then((ms) => {
                    Axios.get(backendURL + '/list_problem_submit/' + this.state.problem['problemId']).then(res => {
                        this.state.mockLog[0] = res.data['logData'][res.data['logData'].length - 1];
                        console.log(this.state.mockLog);
                        Axios.get(backendURL + '/get_user/' + this.decryptPlainText(localStorage.getItem('U2FsdGVkX1+mSZ68YZV2YQ9pMNgBL/UQj1YOjaAxZn0='))).then(res => {
                            console.log(res.data[0]["problemSolved"]);
                            let problemJustSolved = res.data[0]["problemSolved"];
                            const findProblem = problemJustSolved.find( detail => detail.id === this.state.problem['problemId']);
                            let passedCount = 0;
                            let addCount = 0;
                            for(let i = 0; i < caseResult.length; i++) 
                                if(caseResult[i] === 'P')passedCount++;
                            // None history user 
                            if(problemJustSolved.indexOf(findProblem) < 0){
                                problemJustSolved.push({
                                    "id": this.state.problem['problemId'],
                                    "solved": (passedCount === caseResult.length),
                                    "solveCount": passedCount
                                })
                                if(passedCount === caseResult.length)
                                    addCount = 1;
                            }
                            //History User
                            else{
                                problemJustSolved[problemJustSolved.indexOf(findProblem)] = {
                                    "id": this.state.problem['problemId'],
                                    "solved": (passedCount === caseResult.length),
                                    "solveCount": passedCount
                                }
                                //This time passed
                                if((passedCount === caseResult.length) && !this.state.problem['problemId']['solved']){
                                    addCount = 1;
                                }
                                //This time failed
                                else if(!(passedCount === caseResult.length) && this.state.problem['problemId']['solved']){
                                    addCount = -1;
                                }
                            }
                            Axios.post(backendURL + '/update_problem/' + this.state.problem['problemId'], {
                                passedCount : (this.state.problem['passedCount'] + addCount)
                            }).then(res =>{    
                                console.log(res)
                            }).catch((err) => {
                                swal("Update problem failed!", "error");
                                return []
                            });

                            Axios.post(backendURL + '/update_user/' + this.decryptPlainText(localStorage.getItem('U2FsdGVkX1+mSZ68YZV2YQ9pMNgBL/UQj1YOjaAxZn0=')), {
                                problemSolved: problemJustSolved
                                }).then((res) => {
                                    console.log(res.data);
                                    swal("Upload success!", "success"); 
                                }).catch((err) => {
                                    swal("Update user failed!", "error");
                                    return []
                                });
                        }).catch( (err) => {
                            console.log('err: get user');
                        });
                    }).catch( (err) => {
                        console.log('err: get listing submited log');
                    });
                }).catch((ms) => {
                    swal("Submit failed!", "error");
                    return []
                });
        }
        return output;
    }

    handleSend = (e) => {
        e.preventDefault();
        if(this.state.uploadedCode === ''){
            swal("Empty Code!", "error");
        }
        else{
            this.setState({
                output: this.sendTestCase( 0, []),
                loading: true
            })
        }
    }

    update(){
        Axios.get(backendURL + '/get_problem/' + this.props.location.state['id']).then(res => {
            this.setState({
                problem : res.data[0]
            });
            problemCases = this.state.problem['testCase'];
            this.setState({});
        }).catch( (err) => {
            console.log('err: get '+ this.props.location.state['id'] +' problem');
        });
    }

    render() {
        return (
            <div>
                <div className="container-fluid" >
                    <div style={divStyleHightLine} />
                    <div className="row ">
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <DetailsCard problem={this.state.problem} />
                            <TestCase />     
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Submission
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4" />
                                        <div className="col-4">
                                            <div className='sweet-loading'>
                                                <DotLoader
                                                color={'#123abc'} 
                                                loading={this.state.loading} 
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-12">
                                        <div style={divStyleHightLine} /> 
                                            <input id="file" type="file" className="btn btn-block btn-primary " onChange={this.uploadfile.bind(this)} ref={(ref) => this.fileUpload = ref}/>
                                        </div>
                                    </div>
                                    <div style={divStyleHightLine} />
                                    <div className="row ">
                                        <div className="col-sm-8 col-md-8 col-lg-8" />
                                        <div className="col-sm-4 col-md-4 col-lg-4">
                                            <button  onClick={this.handleSend} type="button" className="btn btn-block btn-success ">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> Result
                                </div>
                                <div className="card-body ">
                                    <SubmitTable mockLog={this.state.mockLog}/>
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

export default ProblemItem