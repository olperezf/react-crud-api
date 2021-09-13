import React, { Component } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

class ConfirmRemovalModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };
  
  
  deleteUser = id => {
    const { deleteUser } = this.props
    deleteUser(id)
    this.toggle();
  };

  render() {
    const { modal } = this.state
    const { id } = this.props

    return (
      <div>
        <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really wanna delete the user?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button type="button" color="primary" onClick={() => this.deleteUser(id)} >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmRemovalModal;
