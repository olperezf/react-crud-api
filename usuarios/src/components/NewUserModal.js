import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewUserForm from "./NewUserForm";

class NewUserModal extends Component {
  
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const { create, user, createUser, editUser }  = this.props
    const { modal } = this.state

    let title = "Editing User";
    let button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New User";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <div>
        {button}
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewUserForm
              toggle = { this.toggle }
              user = { user }
              createUser = { createUser }
              editUser={ editUser }
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default NewUserModal;
