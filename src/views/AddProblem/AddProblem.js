import React, { Component } from 'react';

import { Button } from 'reactstrap';
import Axios from 'axios';
import swal from 'sweetalert';

const divStyleHeightLine = {
    height: '20px'
};

const divStyleHeight = {
    height: '160px'
};

class Testcase extends Component {

    updateInput() {
        this.props.problem['input'] = 'a';
        console.log(this.props.problem['input']);
    }

    updateOutput(key, value) {
        this.setState((prev) => {
            prev.problemData[key] = value;
            return prev;
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <input type="text" value={''} onChange={(e) => this.updateInput()} class="form-control" placeholder="Input"/>  
                </div>
                <div className="col-6">
                    <input type="text" value={''} onChange={(e) => this.updateProblem('name', e.target.value)} class="form-control" placeholder="Output"/>  
                </div>
            </div>
        );
    }
}

class ReqIO extends Component {

}
class AddProblem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            problemData: {
                name: '',
                difficulty: 'Easy',
                description: '',
                reqInput: '',
                reqOutput: '',
                testcase:[
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
            prev.problemData['testcase'][index][type] = value;
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
                for(var i = 0; i < this.state.problemData.testcase.length; i++)
                {
                    if(!(this.state.problemData.testcase[i]['input'] && this.state.problemData.testcase[i]['output']))break;
                }
                return true;
            }    
        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.isFormComplete()){
            Axios.post('http://127.0.0.1:3333/add_problem', {
                name: this.state.problemData.name,
                difficulty: this.state.problemData.difficulty,
                description: this.state.problemData.description,
                reqInput: this.state.problemData.reqInput,
                reqOutput: this.state.problemData.reqOutput,
                testcase: this.state.problemData.testcase
            }).then((res) => {
                swal(res.data);
            }).catch((err) => {
                swal('warning something go wrong');
            });
        } else {
            swal('Form is incompleted.');
        }
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
                            <input type="text" value={this.state.problemData.reqInput} onChange={(e) => this.updateProblem('reqInput', e.target.value)} class="form-control" placeholder="Input explain:"/>
                        </div>
                        <div className="col-6">
                        <input type="text" value={this.state.problemData.reqOutput} onChange={(e) => this.updateProblem('reqOutput', e.target.value)} class="form-control" placeholder="Output explian:"/>
                        </div> 
                    </div>
                    <div style={divStyleHeightLine}>
                    <h3>Test case</h3>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[0]['input']} onChange={(e) => this.updateTestCase(0, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[0]['output']} onChange={(e) => this.updateTestCase(0, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[1]['input']} onChange={(e) => this.updateTestCase(1, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[1]['output']} onChange={(e) => this.updateTestCase(1, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[2]['input']} onChange={(e) => this.updateTestCase(2, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[2]['output']} onChange={(e) => this.updateTestCase(2, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[3]['input']} onChange={(e) => this.updateTestCase(3, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[3]['output']} onChange={(e) => this.updateTestCase(3, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[4]['input']} onChange={(e) => this.updateTestCase(4, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[4]['output']} onChange={(e) => this.updateTestCase(4, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[5]['input']} onChange={(e) => this.updateTestCase(5, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[5]['output']} onChange={(e) => this.updateTestCase(5, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[6]['input']} onChange={(e) => this.updateTestCase(6, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[6]['output']} onChange={(e) => this.updateTestCase(6, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[7]['input']} onChange={(e) => this.updateTestCase(7, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[7]['output']} onChange={(e) => this.updateTestCase(7, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[8]['input']} onChange={(e) => this.updateTestCase(8, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[8]['output']} onChange={(e) => this.updateTestCase(8, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
                        </div>
                    </div>
                    <div style={divStyleHeightLine} />
                    <div className="row">
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[9]['input']} onChange={(e) => this.updateTestCase(9, 'input', e.target.value)} class="form-control" placeholder="Input"/>  
                        </div>
                        <div className="col-6">
                            <input type="text" value={this.state.problemData.testcase[9]['output']} onChange={(e) => this.updateTestCase(9, 'output', e.target.value)} class="form-control" placeholder="Output"/> 
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