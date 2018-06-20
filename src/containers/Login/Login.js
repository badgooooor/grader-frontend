import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form } from 'reactstrap';
import image from '../../background-1.jpg'
import Axios from 'axios';
import swal from 'sweetalert';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regisData: {
                username: '',
                password: '',
                passwordConfirm: '',
                email: ''
            },
            regisValidate: {
                username: false,
                password: false,
                passwordConfirm: false,
                email: false
            },
            loginData: {
                username: '',
                password: ''
            },
            validLogin: null,
            registerMsg: '',
            loginMsg: '',
            register: false
        }
    }

    toggle = (e) => {
        this.setState({
            register: !this.state.register
        });
    }

    handleRegister = (e) => {
        e.preventDefault();
        let completed = false;
        var regisData = this.state.regisData;
        var regisValidate = this.state.regisValidate;
        
        // console.log(regisValidate);
        // console.log(regisData);

        Object.keys(regisData).forEach((keys) => {
            if(regisData[keys] === '') {
                regisValidate[keys] = false;
                completed = false;
                this.setState({
                    registerMsg: 'Form is incompleted.'
                });
            } else {
                regisValidate[keys] = true;
                completed = true;
            }
        });

        // console.log(regisValidate);
        
        // this.setState({
        //     regisValidate: this.regisValidate
        // });

        if(completed && regisData.password !== regisData.passwordConfirm) {
            this.setState({
                registerMsg: 'Password is not match.'
            });
            completed = false;
        }
        
        // Waiting for edit with server
        if(completed) {
            Axios.post('http://127.0.0.1:3333/add_users', { 
                username: regisData.username,
                password: regisData.password,
                email: regisData.email
            }).then( (res) => {
                // console.log(res);
                swal("Successful!", "You clicked the button!", "success");
                this.toggle();
            }).catch( (err) => {
                swal('Warning', 'Username already exist', 'warning');
            });
            // (TODO) add auto login
        }
    }

    // Wating for edit with server
    handleLogin = (e) => {
        e.preventDefault();
        if(this.state.loginData.password && this.state.loginData.username) {
            // console.log(this.state.loginData);
            Axios.post('http://127.0.0.1:3333/check_users', {
                username: this.state.loginData.username,
                password: this.state.loginData.password
            }).then( (res) => {
                // console.log(res);
                if(res.data == 'found'){
                    swal("Login complete!", "go go go go!", "success");
                    this.props.history.push('/Home');
                }
            }).catch( (err) => {
                swal('Warning', 'Username or Password was wrong!', 'warning');
            });
        } else {
            this.setState({
                loginMsg: 'Form is incompleted.'
            });
        }
        
    }

    updateRegis(key, value) {
        this.setState((prev) => {
            prev.regisData[key] = value;
            return prev;
        })
    }

    updateLogin(key, value) {
        this.setState((prev) => {
            prev.loginData[key] = value;
            return prev;
        })
    }

    render() {
        var background = {
            backgroundImage: 'url('+image+')',
            height: 'auto',
            width: '100%',
            position: 'fixed'
        };
        return (
            <div className="app flex-row align-items-center pace-done" style={background}>
                <div className="container">

                    <Modal isOpen={this.state.register} toggle={this.toggle} class="col">
                        <ModalHeader toggle={this.toggle}>Registration Form</ModalHeader>
                        <ModalBody>
                            <Form autoComplete="off" onSubmit={this.handleRegister}>
                                Username
                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                        <input value={this.state.regisData.username} onChange={(e) => this.updateRegis('username', e.target.value)} type="text" className="form-control" placeholder="Username" />
                                    </div>
                                </div>
                                Password
                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                        <input value={this.state.regisData.password} onChange={(e) => this.updateRegis('password', e.target.value)}type="password" className="form-control" placeholder="Password" />
                                    </div>
                                </div>
                                Confirm Password
                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                        <input value={this.state.regisData.passwordConfirm} onChange={(e) => this.updateRegis('passwordConfirm', e.target.value)}type="password" className="form-control" placeholder="Confirm Password" />
                                    </div>
                                </div>
                                Email
                                <div class="input-group mb-4">
                                    <div class="input-group-prepend">
                                        <input value={this.state.regisData.email} onChange={(e) => this.updateRegis('email', e.target.value)} type="text" className="form-control" placeholder="Email" />
                                    </div>
                                </div>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            {
                                this.state.registerMsg === "" ? "" :
                                <div style={{ marginRight: 16 }}>
                                    {this.state.registerMsg}
                                </div>
                            }
                            <div>
                                <button type="button" onClick={this.handleRegister} className="btn btn-primary">Register</button>
                            </div>
                        </ModalFooter>
                    </Modal>

                    <div className="row justify-content-center">
                        <div className="card-group">
                            <div className="card p-4" style={{ padding: 20 }}>

                                <div className="card-body">
                                    <h1>Log In</h1>
                                    <p className="text-muted">Sign In to your account</p>

                                    <form>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <input type="text" value={this.state.loginData.username} onChange={(e) => { this.updateLogin('username', e.target.value)}} className="form-control" placeholder="Username" />
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <input type="password" value={this.state.loginData.pasword} onChange={(e) => { this.updateLogin('password', e.target.value)}} className="form-control" placeholder="Password" />
                                            </div>
                                        </div>
                                        { this.state.loginMsg ? <p>{ this.state.loginMsg}</p> : '' }
                                        <div className="row">
                                            <div className="col-6">
                                                <button onClick={this.handleLogin} type="button" className="btn btn-primary px-4">Login</button>
                                            </div>
                                            <div className="col-6">
                                                <Button color="link" onClick={this.toggle}>Register</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card p-4 bg-dark text-light" style={{ padding: 20 }}>

                                <div className="card-body">
                                    <h1>JustCodeIt!</h1>
                                    <p>Grader for Computer Engineering, cyka blyat</p>
                                    <p className="text-danger">During construction. Proceed with caution</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login