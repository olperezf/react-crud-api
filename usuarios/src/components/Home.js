import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import UserList from "./UserList";
import NewUserModal from "./NewUserModal";


class Home extends Component {
 
  render() {
    const { users, deleteUser, createUser, editUser } = this.props
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <UserList
               users={users}
               deleteUser={deleteUser}
               editUser={editUser}
            />
          </Col>
        </Row>
        <Row style={{ textAlign: "center" }} >
          <Col>
            <NewUserModal 
                create={true} 
                createUser={createUser}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
