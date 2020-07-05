//Daniel Garcia Sampar e Rodrigo Zimmerman

import React, {useEffect, useState} from 'react';
import api from './service/api';

import GlobalStyle from './global';
import {Container, Table, Form, Strong} from './styles'

function GamersPage() {
  const [games, setGames] = useState([]);

  const[isEditing, setIsEditing] = useState(false);

  const[id, setId] = useState('');
  const[title, setTitle] = useState('');
  const[price, setPrice] = useState(0);
  const[platform, setPlatform] = useState('');
  const[image, setImage] = useState('');
  const[totalAvailable, setTotalAvailable] = useState(0);


  useEffect(() => {
    loadGames();
  }, [])

  async function loadGames(){
    const response = await api.get('/games');
    setGames(response.data)
  }

  async function handleEdit(data){
    setId(data.id);
    setTitle(data.title);
    setPrice(data.price);
    setPlatform(data.platform);
    setImage(data.image);
    setTotalAvailable(data.totalAvailable);
    setIsEditing(true);

  }

  async function handleUpdate(e){
    e.preventDefault();
    await api.put(`/games/${id}`, {
      id,
      title,
      price,
      platform,
      image,
      totalAvailable
    });
    setId('');
    setIsEditing(false);
    loadGames();
  }

  async function handleDelete(id) {
    await api.delete(`/games/${id}`);
    setGames(games.filter(game => game.id !== id))
}

  async function handleSubmit(e){
    e.preventDefault();
    const response = await api.post('/games', {
        title,
        price,
        platform,
        image,
        totalAvailable
    });
    
    setGames([...games, response.data]);
    //loadEmployees();
  }

  function handleCancel(){
    setId('');
    setTitle('');
    setPrice('');
    setPlatform('');
    setImage('');
    setTotalAvailable('');
  }


  return (
    <Container>
      <GlobalStyle/>
        
          <Form onSubmit={handleSubmit}>
            <Strong>Cadastro</Strong>
            <label>Titulo:</label>
            <input className="string" id="title" required value={title} onChange={e => setTitle(e.target.value)}></input>
            <label>Preco:</label>
            <input className="string" id="price" required value={price} onChange={e => setPrice(e.target.value)}></input>
            <label>Plataforma:</label>
            <input className="string" id="price" required value={platform} onChange={e => setPlatform(e.target.value)}></input>
            <label>Imagem:</label>
            <input className="string" id="avatar" value={image} onChange={e => setImage(e.target.value)}></input>
            <label>Quantidade:</label>
            <input className="string" id="totalAvailable" value={totalAvailable} onChange={e => setTotalAvailable(e.target.value)}></input>
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
                <th>Titulo</th>
                <th>Preco</th>
                <th>Plataforma</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game, index) => (
                <tr key={index}>
                  <td>{game.title}</td>
                  <td>{game.price}</td>
                  <td>{game.platform}</td>
                  <td><img src={game.image} alt={game.name}/></td>
                  <td>{game.totalAvailable}</td>
                  <td>
                    <button onClick={() => window.confirm(`Deseja deletar o funcionario com id: ${game.id} e nome ${game.title}?`)
                                       ? handleDelete(game.id) : ''}>Excluir</button>
                    <button onClick={() => handleEdit(game)}>Editar</button>                     
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
    </Container>
  );
}

export default GamersPage;
