import React, { Component } from 'react';

import { Button } from 'reactstrap';

const divStyleHeightLine = {
    height: '20px'
};

const divStyleHeight = {
    height: '160px'
};

class Testcase extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <input type="text" class="form-control" placeholder="Input"/>  
                </div>
                <div className="col-6">
                    <input type="text" class="form-control" placeholder="Output"/>  
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
                difficulty: '',
                description: '',
                testcase:[]
            }
        }
    }

    updateProblem(key, value) {
        this.setState((prev) => {
            prev.problemData[key] = value;
            return prev;
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
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
                                <input type="text" value={this.state.problemData.difficulty} onChange={(e) => this.updateProblem('difficulty', e.target.value)} class="form-control" placeholder="Difficulty"/>
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
                    <div style={divStyleHeightLine}>
                    <h3>Test case</h3>
                    </div>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>
                    <div style={divStyleHeightLine} />
                    <Testcase/>

                    <div className="footerSpace" style={divStyleHeight} />
                </div>
            </div>
        );
    }
}

export default AddProblem