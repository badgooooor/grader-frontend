import React, { Component } from 'react';
import Axios from 'axios';
import swal from 'sweetalert'; 
import { DotLoader } from 'react-spinners';

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
    { input: '1 2', output: '3' },
    { input: '2 2', output: '4' },
    { input: '5 4', output: '9' }
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


class ProblemItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            problem : {},
            uploadedCode : '',
            outputCase : [],
            result : '',
            loading: false
        }
        this.update();
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
        if(caseIndex < 10){
            Axios.post('http://127.0.0.1:3333/judge', {
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
            this.setState({
                result : caseResult
            });
            swal("Upload success!", "success"); 
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
        Axios.get('http://127.0.0.1:3333/get_problem/' + this.props.location.state['id']).then(res => {
            this.setState({
                problem : res.data[0]
            })
            problemCases = this.state.problem['testCase'];
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
                                    {this.state.result}
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