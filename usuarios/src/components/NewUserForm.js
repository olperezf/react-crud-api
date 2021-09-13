import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

class NewUserForm extends Component {
  
  state = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    active: "",
    created_at: "" 
  };


  constructor(props){
    super(props)
    const { user } = this.props
    if (user) {
      this.state = user
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createUser = e => {
    const { toggle, createUser } = this.props
    e.preventDefault();
    createUser(this.state)
    toggle();
  };

  editUser = e => {
    const { toggle, editUser, user } = this.props
    e.preventDefault();
    editUser(user.id,this.state)
    toggle();
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    const { user } = this.props
    const { name, email, phone, active } = this.state
    
    return (
      <Form onSubmit={ user ? this.editUser : this.createUser}>
        <FormGroup >
           <Label for="name">Name:</Label>
           <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(name)}
           />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone:</Label>
          <Input
            type="text"
            name="phone"
            onChange={this.onChange}
            value={this.defaultIfEmpty(phone)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="active">Active:</Label>
          <Input
            type="text"
            name="active"
            onChange={this.onChange}
            value={this.defaultIfEmpty(active)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewUserForm;
