import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(){
        super();

        this.state = {
            form: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const name = e.target.dataset.name;
        const value = e.target.value;
        const data = {};
        data[name] = value;

        this.setState({
            form: Object.assign(this.state.form, data)
        });
    }
    handleSubmit(e){
        e.preventDefault();

        fetch(
            'http://localhost:5000/auth/login',
            {
                method: 'POST', //or 'PUT'
                body: JSON.stringify(this.state.form), //data can be `string` or {obj}
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(data => data.json())
            .then(response => {
                if(response.success && response.token){
                    localStorage.setItem('token', response.token);
                    this.props.setLoggedIn();
            }
            })
            .catch(err => console.log(err));
    }

    render() {
        return(
            <form>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="input-email">Email address</label>
                    <input data-name="email" maxLength="10" onChange={this.handleChange} className="form-control" id="input-email" aria-describedby="emailHelp"
                           placeholder="Enter email..."/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone. Promise.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="input-password">Password</label>
                    <input data-name="password" maxLength="10" onChange={this.handleChange} className="form-control" id="input-password" placeholder="Password..."/>
                </div>
                <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default LoginForm;