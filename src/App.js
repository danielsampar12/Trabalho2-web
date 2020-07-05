//Daniel Garcia Sampar e Rodrigo Zimmerman

import React, {useEffect, useState} from 'react';
import api from './service/api';

import GlobalStyle from './global';
import {Container, Table, Form, Strong, Content} from './styles'

import { Link } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);

  const[isEditing, setIsEditing] = useState(false);

  const[id, setId] = useState('');
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[age, setAge] = useState('');
  const[image, setImage] = useState('');


  useEffect(() => {
    loadUsers();
  }, [])

  async function loadUsers(){
    const response = await api.get('/users');
    setUsers(response.data)
  }

  async function handleEdit(data){
    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setAge(data.age);
    setImage(data.image);
    setIsEditing(true);

  }

  async function handleUpdate(e){
    e.preventDefault();
    await api.put(`/users/${id}`, {
      id,
      name,
      email,
      age,
      image
    });
    setId('');
    setIsEditing(false);
    loadUsers();
  }

  async function handleDelete(id) {
    await api.delete(`/users/${id}`);
    setUsers(users.filter(user => user.id !== id))
}

  async function handleSubmit(e){
    e.preventDefault();
    const response = await api.post('/users', {
      name,
      email,
      age,
      image
    });
    
    setUsers([...users, response.data]);
    //loadEmployees();
  }

  function handleCancel(){
    setId('');
    setName('');
    setEmail('');
    setAge('');
    setImage('');
  }

  let options = [];
  for(let i =0; i <= 150; i++){
    options.push(<option value={i} key={i}>{i}</option>)
  }

  return (
    <Container>
      <GlobalStyle/>
          <Content><Link to={'/games'} >Games</Link></Content>
          <Form onSubmit={handleSubmit}>
            <Strong>Cadastro</Strong>
            <label>Nome:</label>
            <input className="string" id="name" required value={name} onChange={e => setName(e.target.value)}></input>
            <label>Email:</label>
            <input className="string" id="salary" required value={email} onChange={e => setEmail(e.target.value)}></input>
            <label>Idade:</label>
            <select onChange={e => setAge(e.target.value)}>
              <option value={age}>{age}</option>
              {options}

            </select>
            <label>Avatar:</label>
            <input className="string" id="avatar" value={image} onChange={e => setImage(e.target.value)}></input>
            <div className="buttons">
              <button type="submit">Salvar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
            {isEditing && <button className="edit" onClick={handleUpdate}>Alterar</button>}
          </Form>
        
        <main>
          <Table>
          <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Idade</th>
                <th>Avatar</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td><img src={user.image} alt={user.name}/></td>
                  
                  <td>
                    <button onClick={() => window.confirm(`Deseja deletar o funcionario com id: ${user.id} e nome ${user.name}?`)
                                       ? handleDelete(user.id) : ''}>Excluir</button>
                    <button onClick={() => handleEdit(user)}>Editar</button>                     
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
    </Container>
  );
}

export default App;
