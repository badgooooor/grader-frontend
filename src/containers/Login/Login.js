import React, { Component } from 'react';

class Login extends Component {
    

    render() {
        return (
            <div class="app flex-row align-items-center pace-done">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="card-group">
                            <div class="card p-4" style={{ padding: 20 }}>

                                <div class="card-body">
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>

                                    <form>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <input type="text" class="form-control" placeholder="Username" />
                                            </div>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <input type="password" class="form-control" placeholder="Password" />
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-6">
                                                <button type="button" class="btn btn-primary px-4">Login</button>
                                            </div>

                                            <div class="col-6 text-right">
                                            <button type="button" class="btn btn-link px-0">Register</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card p-4 bg-dark text-light" style={{ padding: 20 }}>

                                <div class="card-body">
                                    <h1>JustCodeIt!</h1>
                                    <p>Grader during construction, cyka blyat.</p>
                                    <p class="text-danger">Proceed with caution</p>
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