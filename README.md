# Elaborar desde 0 un CRUD(Create, Read, Update, Delete) en React, Utilizando como api: Rails6 ó Django3 en Debian 10
Aquí vamos a utilizar los componentes básicos de react, sin utilizar librerias como Redux, Hooks, entre otros. Librerías que lo veremos después en otro apartado.
### Instalación de Nodejs:
- Node.js es una plataforma basada en el motor JavaScript V8 de Chrome. Debe agregar el PPA(Personal Package Archive) de Node.js a su sistema proporcionado por el sitio web oficial de Nodejs. También necesitamos instalar el paquete software-properties-common si aún no está instalado. Se instalará la versión 14. Ejecutar el siguiente comando:

      $ sudo apt-get install curl software-properties-common 
      $ curl -sL https://deb.nodesource.com/setup_14.x | sudo bash - 
      
- Después de agregar el archivo PPA requerido, instalemos el paquete Nodejs. NPM también se instalará con node.js. Este comando también instalará muchos otros paquetes dependientes en su sistema.

      $ sudo apt-get install nodejs 
      
- Después de completar la instalación verifique la versión instalada de Node.js. Puede encontrar más detalles sobre la versión actual en el sitio web oficial de node.js: https://nodejs.org/en/

      $ node -v  
      
      v14.16.1


### Instalación de yarn:
- Yarn es un software de gestión de paquetes avanzado para aplicaciones Node.js. Es una alternativa rápida, segura y confiable que cualquier otro administrador de paquetes de Nodejs. El equipo de Yarn proporciona un repositorio Apt para instalar yarn en la máquina Debian. Ejecute los siguientes comandos para importar la clave gpg y configurar el repositorio de yarn apt.

      $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
      $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
      
- Ahora escriba los siguientes comandos para instalar yarn en Debian.

      $ sudo apt-get update
      
      comando que instalará solo yarn sin node.js
      $ sudo apt-get install --no-install-recommends yarn
      
      si no tiene instalado node.js ejecutar este comando para que instale yarn y node.js:
      $ sudo apt-get install yarn
      
- Para encontrar mas detalles de Yarn visitar: https://yarnpkg.com/

### Creación del API:
En este mismo repositorio tengo como construir un api Django3 o Rails6 desde 0, y esta adaptado para que pueda conectarse con esta nueva aplicación de React (Usuarios):

- API Rails 6:
      https://github.com/olperezf/api-Rails6

- API Django 3:
      https://github.com/olperezf/api-Django3

Después que tenga creado su API, continuar con el siguiente paso de Crear una aplicación de Usuarios en React.


### Creación del proyecto React:
- Primero vamos a seleccionar nuestra ruta donde vamos a crear nuestro proyecto, en mi caso  Proyectos/React/ , ahora creamos el proyecto "usuarios" con el siguiente comando:

      /Proyectos/React$ npx create-react-app usuarios

- Luego entrammos dentro del proyecto creado:

      /Proyectos/React$ cd usuarios

- Y desplegamos la primera página de react con el siguiente comando:

      /Proyectos/React/usuarios$ yarn start
      
- Mostrando la siguiente página:



- Luego agreguemos algunas dependencias importantes que vamos a utilizar dentro del proyecto:

      /Proyectos/React/usuarios$ yarn add bootstrap reactstrap axios
      
Estamos añadiendo Bootstrap para el estilo, y Reactstrap es una forma muy poderosa de hacer esto, ya que es más fácil usar componentes integrados de Bootstrap listos. y Axios es el cliente HTTP basado en promesas que usaremos para realizar llamadas de solicitud HTTP a nuestra API. 

### src / index.js
Cuando ejecutamos la aplicación el punto de entrada es el index.js ubicado en src / index.js.    
Ir a src / index.js y agregar la siguiente declaración de importación: import ‘bootstrap/dist/css/bootstrap.min.css’ quedando el código de la siguiente manera:


      import React from 'react';
      import ReactDOM from 'react-dom';
      import 'bootstrap/dist/css/bootstrap.css';
      import './index.css';
      import App from './App';
      import reportWebVitals from './reportWebVitals';

      ReactDOM.render(
          <App />,
        document.getElementById('root')
      );

      // If you want to start measuring performance in your app, pass a function
      // to log results (for example: reportWebVitals(console.log))
      // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
      reportWebVitals();
      
      
El archivo comienza importando todos los módulos JS y otros activos que necesita para ejecutarse. src/index.css contiene estilos globales que se aplican a toda nuestra aplicación, lo mismo para bootstrap.css. Podemos ver que nuestro componente App también es importado acá; su importación es posible gracias a la declaración export en la parte inferior de App.js.   
Se invoca la función ReactDOM.render() de React con dos argumentos:

1) El componente que queremos renderizar, App en este caso.
2) El elemento DOM dentro del cual queremos que se renderice el componente, en este caso, el elemento con un ID de root.

Todo esto le indica a React que queremos renderizar nuestra aplicación React con el componente App como raíz, o primer componente.

reportWebVitals(): Web Vitals es un conjunto de métricas útiles que tienen como objetivo capturar la experiencia del usuario de una página web. En Create React App, se utiliza una biblioteca de terceros para medir estas métricas (web-vitals). "Aquí en este proyecto no lo vamos a utilizar si quiere se puede borrar"   

### src / App.js
Este archivo contiene nuestro primer componente, donde tendrá la lógica principal. 

- Sustituir el siguiente código: 

      import logo from './logo.svg';
      import './App.css';

      function App() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        );
      }

      export default App;
      
      
- Por éste otro código:

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
      
Análisis:   

      import React, { Component} from "react";
      import Header from "./components/Header";      <-- crearemos este componente mas adelante
      import Home from "./components/Home";          <-- crearemos este componente mas adelante
      import axios from "axios";
      import { API_URL } from "./constants/index";   <-- crearemos este componente mas adelante

Como se podrá observar arriba, importamos  React { Component }, Header, Home, Axios y API_URL.     

La clase App extiende de Component.

Inicializamos el estado con users:

      state = {
        users: []
      };
      
Obtenemos los usuarios desde el API y setea el estado con los usuarios obtenidos:

      getUsers = () => {
        axios.get(API_URL).then(({data}) => this.setState({ users: data }));
      }

Ejecuta una sola vez el constructor llamando a getUsers:

      constructor(){
         super()
         this.getUsers()
      }
      
Estan las funciones: deleteUser, createUser y editUser donde se conectan con la API para realizar sus procesos correspondientes:

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

Luego renderizamos retornando los 2 componentes: Header y Home

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

Y finaliza exportando el App para ser utilizado por otros componentes: 

      export default App
      
### src / App.css
Agregar el siguiente código:

      .App-logo {
        height: 20vmin;
        pointer-events: none;
      }

      @media (prefers-reduced-motion: no-preference) {
        .App-logo {
          animation: App-logo-spin infinite 20s linear;
        }
      }

      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      
### Creación de la constante API_URL      
Crear una carpeta llamada constants en src y luego un archivo llamado index.js. Quedando la ruta:

      src/constants/index.js
      
Agregar el siguiente contenido en index.js:

      Para conectarse con Django utilizar la siguiente ruta:
            export const API_URL = "http://127.0.0.1:8000/api/users/"; 
      
      Para conectarse con Rails utilizar la siguiente ruta:
            export const API_URL = "http://localhost:3001/api/v1/users/";

      
### Creación del componente Header:
Crear una carpeta llamada components en src y luego un archivo llamado Header.js. Quedando la ruta:

      src/components/Header.js

Agregar el siguiente contenido en Header.js:

      import React, { Component } from "react";
      import logo from '../logo.svg';
      import '../App.css';

      class Header extends Component {
        render() {
          return (
            <div className="text-center">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>App(Usuarios) with React + API  Django o Rails</h2>
            </div>
          );
        }
      }

      export default Header;

### Creación del componente Home:
Crear un archivo llamado Home.js dentro de src/components/ quedando la ruta:

      src/components/Home.js
      
Agregar el siguiente contenido en Home.js:

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
      
Análisis:

      import { Col, Container, Row } from "reactstrap"  <-- importamos los componentes de Bootstrap
      import UserList from "./UserList"                 <-- importamos el componente donde se lista los usuarios
      import NewUserModal from "./NewUserModal"         <-- importamos el componente donde se despliega el modal del usuario
      
Obtenemos las propiedades del componente padre:

      const { users, deleteUser, createUser, editUser } = this.props

### Creación del componente NewUserModal:
Crear un nuevo archivo de componente llamado NewUserModal.js y agregue el siguiente código:

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

Análisis:

      import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"  <-- importando los componentes de bootstrap.
      import NewUserForm from "./NewUserForm";                            <-- importando el componente formulario de usuario
      
El único estado que estamos creando es el estado del modal para verificar si debe estar abierto o cerrado:

       state = {
         modal: false
       };
      
La función toggle (la que recibe nuestro formulario como parámetro) cambiará el valor del modal actual al opuesto cada vez que se llame:

       toggle = () => {
          this.setState(previous => ({
            modal: !previous.modal
          }));
       };
       
En la función de renderizado, primero verificamos si se pasó un booleano de creación como parámetro del llamador principal para decidir si el botón es para editar o crear una acción. Los botones se crean dinámicamente dependiendo de lo que nos dice el componente padre.

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
          
Luego, el componente modal se puede montar en estas condiciones más abajo. Observar donde esta el componente <NewUserForm />

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
          
### Creación del componente NewUserForm:
Crear un nuevo archivo de componente llamado NewUserForm.js y agregue el siguiente código:

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
        
Análisis:

Creamos nuestro objeto de estado con las propiedades correspondientes del modelo de nuestro usuarios:

       state = {
          id: 0,
          name: "",
          email: "",
          phone: "",
          active: "",
          created_at: "" 
        };
        
 La función constructor se ejecuta una sola vez verificando si hay propiedades del usuario para setearlo al estado:
      
      constructor(props){
          super(props)
          const { user } = this.props
          if (user) {
            this.state = user
          }
        }
        
        
 La función onChange manejará la actualización de la propiedad de cada estado con el valor actual escrito en cada campo respectivo:
 
       onChange = e => {
          this.setState({ [e.target.name]: e.target.value });
        };
        
La función createStudent y editUser se ocupará de las solicitudes HTTP de nuestro formulario. Cada vez que presionamos el botón enviar, se llamará a cualquiera de estas funciones dependiendo del caso, lo que activará el axios en nuestra APP pasandole unos parametros a la función padre. Una vez que se complete, llamaremos a las funciones de accesorios resetState (para actualizar la tabla) y alternar (para cerrar el modal):

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
        
La función defaultIfEmpty se creó como una función auxiliar que verificará el valor actual de cada campo para determinar si se completarán con el valor del estado (en caso de que exista, para editar) o no (cuando se estacreando un nuevo usuario):

        defaultIfEmpty = value => {
          return value === "" ? "" : value;
        };

La función de render solo compondrá nuestro formulario con la ayuda de los componentes reactstrap. La propiedad onSubmit, busca una propiedad de accesorios llamada usuario: si existe, la función de envío será para editar (el valor fue pasado por el componente principal); de lo contrario, es para la creación.

      <Form onSubmit={ user ? this.editUser : this.createUser}>
      

#### Creación del componente UserList:
Crear un nuevo archivo de componente llamado UserList.js y agregue el siguiente código:

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
      
Análisis:

      import ConfirmRemovalModal from "./ConfirmRemovalModal" : importamos el componente ConfirmRemovalModal
      
El corazón de este componente es la iteración sobre el accesorio de los usuarios que recibiremos del componente principal. La función de mapa se encargará de la iteración proporcionando una variable (usuario) para que accedamos a cada valor:

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
      
Luego podrá observar arriba el return de 2 componentes iterandose: NewUserModal y ConfirmRemovalModal.

### Creación del componente ConfirmRemovalModal:
Crear un nuevo archivo de componente llamado ConfirmRemovalModal.js y agregue el siguiente código:

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

Análisis:

Dado que también es un modal, también debemos tener el apoyo modal del estado, así como la función de alternar.   

La función deleteUser manejará la llamada HTTP por medio de la funcion deleteUser pasandole por parametro el id.:

       deleteUser = id => {
          const { deleteUser } = this.props
          deleteUser(id)
          this.toggle();
        };
        
para finalizar tener en cuenta que React levanta el servidor en el puerto 3000, y Rails también levanta en el puerto 3000 y no puede haber 2 puertos para una misma aplicación, sería recomendable levantar rails en otro puerto por ejemplo en el 3001 con el siguiente comando:

      user-app$ rails s -p 3001  
      
En mi caso se puede observar que el nombre de mi api en rails es user-app.

 
