import React, { Component} from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import axios from "axios";
import { API_URL } from "./constants/index";

class App extends Component {
  
  state = {
    users: []
  };

  getUsers = () => {
    axios.get(API_URL).then(({data}) => this.setState({ users: data }));
  }
  
  constructor(){
    super()
    this.getUsers()
  }

  deleteUser = id => {
    axios.delete(API_URL + id + "/").then(() => {
          this.getUsers() 
    });
  }

  createUser = usuario => {
       axios.post(API_URL,usuario)
         .then(({data}) => {
          const newData = this.state.users.concat(data)
           this.setState({
             users: newData,
           })
         })
     }

  editUser = (id, values) => {                                       
       axios.put(API_URL + id +"/", values).then(()=>{
          const newData = this.state.users.map(x => x.id === id ? values : x) 
           this.setState({
             users: newData,
           })
         })
     }
  
  render() {
    const { users } = this.state
    
    return (
       <div>
        <Header />
        <Home 
          users={users} 
            deleteUser={this.deleteUser}
            createUser={this.createUser}
            editUser={this.editUser}
         />
      </div>
    );
  }
}

export default App;
