import React, { Component } from 'react';

import { Button } from 'reactstrap';
import Axios from 'axios';
import swal from 'sweetalert';
const backendURL = "http://127.0.0.1:3333";

const divStyleHeightLine = {
    height: '20px'
};

const divStyleHeight = {
    height: '160px'
};

class AddProblem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            problemData: {
                problemId: -1,
                name: '',
                difficulty: 'Easy',
                description: '',
                reqInput: '',
                reqOutput: '',
                testCase:[
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''},
                    {input :'', output: ''}
                    ]
            },
            loginMsg: '',
            showDiffForm: false
        }
    }

    updateProblem(key, value) {
        this.setState((prev) => {
            prev.problemData[key] = value;
            return prev;
        })
    }

    updateTestCase(index, type, value) {
        console.log(this.state.problemData);
        this.setState((prev) => {
            prev.problemData['testCase'][index][type] = value;
            return prev;
        })
    }

    isFormComplete(){
        if(this.state.problemData.name !== '' &&
            this.state.problemData.difficulty !== '' &&
            this.state.problemData.description !== '' &&
            this.state.problemData.reqInput !== '' &&
            this.state.problemData.reqOutput !== '')
            {
                for(var i = 0; i < this.state.problemData.testCase.length; i++)
                {
                    if(!(this.state.problemData.testCase[i]['input'] && this.state.problemData.testCase[i]['output']))break;
                }
                return true;
            }    
        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.problemData.problemId)
        if(this.isFormComplete()){
            Axios.post(backendURL + '/edit_problem/' + this.state.problemData.problemId, {
                name: this.state.problemData.name,
                difficulty: this.state.problemData.difficulty,
                description: this.state.problemData.description,
                reqInput: this.state.problemData.reqInput,
                reqOutput: this.state.problemData.reqOutput,
                testCase: this.state.problemData.testCase
            }).then((res) => {
                swal('Success');
            }).catch((err) => {
                swal('warning something go wrong');
            });
        } else {
            swal('Form is incompleted.');
        }
    }

    handleGetProblem = (e) => {
        console.log(this.state.problemData.problemId)
        e.preventDefault();
        if(this.state.problemData.problemId >= 0)
            Axios.get(backendURL + '/get_problem/' + this.state.problemData.problemId).then(res => {
                console.log(res.data);
                if(res.data !== 'Cant find it, duh')
                {
                    this.updateProblem('name', res.data[0].name);
                    this.updateProblem('difficulty', res.data[0].difficulty);
                    this.updateProblem('description', res.data[0].description);
                    this.updateProblem('reqInput', res.data[0].reqInput);
                    this.updateProblem('reqOutput', res.data[0].reqOutput);
                    for(let i = 0; i < 10; i++){
                        this.updateTestCase(i,'input',res.data[0].testCase[i]['input']);
                        this.updateTestCase(i,'output',res.data[0].testCase[i]['output']); 
                    }
                }
                else{
                    swal(res.data);
                }
            }).catch( (err) => {
                console.log('err: get '+ this.state.problemData.problemId +' problem');
            });
    }

    changeDifficulty(e){
        if(e.target.value == '1') {
            this.state.problemData.difficulty = 'Easy';
            this.setState({
                showDiffForm: false
            })
            console.log(this.state.showDiffForm);
        }    
        else if(e.target.value == '2') {
            this.state.problemData.difficulty = 'Medium';
            this.setState({
                showDiffForm: false
            })
        }
        else if(e.target.value == '3')
            this.state.problemData.difficulty = '';
            this.setState({
                showDiffForm: true
            })
            console.log(this.state.showDiffForm);
    }

    showOtherDiffForm(){
        if(this.state.problemData.difficulty == 'Easy' || this.state.problemData.difficulty == 'Medium') this.state.showDiffForm = false;
        if(this.state.showDiffForm == true){
            console.log(this.state.showDiffForm);
            return <input type="text" value={this.state.problemData.difficulty} onChange={(e) => this.updateProblem('difficulty', e.target.value)} class="form-control" placeholder="Difficulty"/>
        }
    }
    
    render() {
        
        return (
            <div>
                <div className="container-fluid" >
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-8">
                            <input type="text" value={this.state.problemData.problemId} onChange={(e) => this.updateProblem('problemId', e.target.value)} class="form-control" placeholder="Problem ID"/>
                        </div>
                        <div className="col-4">
                            <Button color="success" onClick={this.handleGetProblem} size="lg" block>Get</Button>
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                            <div className="col-8">
                                <input type="text" value={this.state.problemData.name} onChange={(e) => this.updateProblem('name', e.target.value)} class="form-control" placeholder="Problem's name"/>
                                <div style={divStyleHeightLine} />
                                <select class="custom-select mr-sm-2" onChange={this.changeDifficulty.bind(this)}>
                                    <option value="1">Easy</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Other</option>
                                </select>
                                {
                                    this.showOtherDiffForm()
                                }
                            </div>
                            <div className="col-4 d-flex"> 
                                <Button color="success" onClick={this.handleSubmit} size="lg" block>Submit</Button>
                            </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-8">
                            <textarea class="form-control" value={this.state.problemData.description} onChange={(e) => this.updateProblem('description', e.target.value)} placeholder="Description" rows="3"></textarea>  
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.reqInput} onChange={(e) => this.updateProblem('reqInput', e.target.value)} class="form-control" placeholder="Input explain:"/>
                        </div>
                        <div className="col-6">
                        <textarea type="form-control" value={this.state.problemData.reqOutput} onChange={(e) => this.updateProblem('reqOutput', e.target.value)} class="form-control" placeholder="Output explian:"/>
                        </div> 
                    </div>
                    <div style={divStyleHeightLine}>
                    <h3>Test case</h3>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[0]['input']} onChange={(e) => this.updateTestCase(0, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[0]['output']} onChange={(e) => this.updateTestCase(0, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[1]['input']} onChange={(e) => this.updateTestCase(1, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[1]['output']} onChange={(e) => this.updateTestCase(1, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[2]['input']} onChange={(e) => this.updateTestCase(2, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[2]['output']} onChange={(e) => this.updateTestCase(2, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[3]['input']} onChange={(e) => this.updateTestCase(3, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[3]['output']} onChange={(e) => this.updateTestCase(3, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[4]['input']} onChange={(e) => this.updateTestCase(4, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[4]['output']} onChange={(e) => this.updateTestCase(4, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[5]['input']} onChange={(e) => this.updateTestCase(5, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[5]['output']} onChange={(e) => this.updateTestCase(5, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[6]['input']} onChange={(e) => this.updateTestCase(6, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[6]['output']} onChange={(e) => this.updateTestCase(6, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[7]['input']} onChange={(e) => this.updateTestCase(7, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[7]['output']} onChange={(e) => this.updateTestCase(7, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[8]['input']} onChange={(e) => this.updateTestCase(8, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[8]['output']} onChange={(e) => this.updateTestCase(8, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[9]['input']} onChange={(e) => this.updateTestCase(9, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <textarea type="form-control" value={this.state.problemData.testCase[9]['output']} onChange={(e) => this.updateTestCase(9, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="footerSpace" style={divStyleHeight} />
                </div>
            </div>
        );
    }
}

export default AddProblem