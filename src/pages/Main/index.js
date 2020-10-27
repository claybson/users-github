import React, {useState, useCallback, useEffect} from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash, FaSearch } from 'react-icons/fa';
import {Container, Content, Form, Perfil, SubmitButton, List, Sidebar} from './styles';

import api from '../../services/api';

export default function Main(){

  const [newUser, setNewUser] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  // Buscar
  useEffect(()=>{
    const userStorage = localStorage.getItem('user');
    if(userStorage){
      setUsers(JSON.parse(userStorage));
    }

    const repoStorage = localStorage.getItem('repos');
    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }

    const listStorage = localStorage.getItem('list');
    if(listStorage){
      setList(JSON.parse(listStorage));
    }

  }, []);

  
  // Salvar alterações
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(users));
  }, [users]);

  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){
      setLoading(true);
      setAlert(null);
      try{

        if(newUser === ''){
          throw new Error('Você precisa indicar um usuário!');
        }

        const response = await api.get(`${newUser}`);
        const lista = await api.get(`${newUser}/repos`);
        setUsers(response.data);
        setList([...list, response.data]);
        

        const hasUser = list.find(user => user.name === newUser);

        if(hasUser){
          throw new Error('Usuário Duplicado');
        }

        let reposi = [];
        lista.data.map((repo) => {
          let data = {
            name: repo.name,
            date: repo.updated_at
          }
          reposi = [...reposi, data];
        })

        setRepositorios(reposi);

        setNewUser('');
      }catch(error){
        setAlert(true);
        console.log(error);
      }finally{
        setLoading(false);
      }

    }

    submit();

  }, [newUser, repositorios]);

  function handleinputChange(e){
    setNewUser(e.target.value);
    setAlert(null);
  }


  return(
    <Container>
      <Content>
        <h1>
          <FaGithub size={25}/>
          Buscar Usuários
        </h1>

        <Form onSubmit={handleSubmit} error={alert}>
          <input 
          type="text" 
          placeholder="Buscar"
          value={newUser}
          onChange={handleinputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14}/>
            ) : (
              <FaSearch color="#FFF" size={14}/>
            )}
          </SubmitButton>

        </Form>

        <Perfil>
              <figure>
                <img src={users.avatar_url}/>
              </figure>
              <div className="info">
                <a href={users.html_url}  target="_blank" class="info__name">{users.name}</a>
                <h3>{users.bio}</h3>
                <div>
                  <span>{users.followers} <a href={users.html_url+'?tab=followers'} target="_blank">Followers</a></span> - <span>{users.following} <a href={users.html_url+'?tab=following'} target="_blank">Following</a></span>
                </div>
                <h4>{users.company}</h4>
                <h4>{users.location}</h4>
              </div>
        </Perfil>

        <List>
          {repositorios.map(repo => (
            <li key={repo.name}>
              <span>
              {repo.name}
              </span>
            </li>
          ))} 
        </List>
      </Content>

      <Sidebar>
      <ul>
      {list.map(user => (
          <li key={user.name}>
            <span>
            {user.name}
            </span>
          </li>
        ))} 
      </ul>
      </Sidebar>

    </Container>

    
  )
}