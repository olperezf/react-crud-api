import React, { Component } from "react";
import { Table } from "reactstrap";
import NewUserModal from "./NewUserModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class UserList extends Component {
  render() {
    const { users, deleteUser, editUser } = this.props
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Active</th>
            <th>Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!users || users.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{String(user.active)}</td>
                <td>{user.created_at}</td>
                <td align="center" style={{ display: "flex" }}>
                  <NewUserModal
                    create = {false}
                    user = {user}
                    editUser={editUser}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id = { user.id }
                    deleteUser={ deleteUser }
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default UserList;
