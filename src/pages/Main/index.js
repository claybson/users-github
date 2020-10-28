import React, {useState, useCallback, useEffect} from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash, FaSearch, FaMapMarkerAlt, FaBuilding, FaUserFriends, FaDatabase } from 'react-icons/fa';
import {Container, Content, Heading, Form, Perfil, SubmitButton, List, Sidebar} from './styles';
import {Link} from 'react-router-dom';
import api from '../../services/api';

export default function Main(){

  const [newUser, setNewUser] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
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
    repositorios.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });
  }, [repositorios]);

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  useEffect(()=>{
    setLoad(localStorage.getItem('load'));
  }, [load]);

  

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){
      setLoading(true);
      setAlert(null);
      
      try{

        if(newUser === ''){
          throw new Error('Você precisa indicar um usuário!');
        }

        localStorage.setItem('load', true);
        setLoad(localStorage.getItem('load'));

        const response = await api.get(`users/${newUser}`);
        const lista = await api.get(`users/${newUser}/repos`);
        setUsers(response.data);

        let reposi = [];
        lista.data.map((repo) => {
          let data = {
            name: repo.name,
            date: repo.updated_at,
            login: repo.owner.login
          }
          reposi = [...reposi, data];
        })

        setRepositorios(reposi);

        const hasUser = list.find(user => user.login === newUser);

        if(hasUser){
          throw new Error('Usuário Duplicado');
        }else{
          setList([...list, response.data]);
        }

        

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

        <Heading>
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
        </Heading>
        { load  ? (
      <Content>
      
        <Perfil>
              <figure>
                <img src={users.avatar_url}/>
              </figure>
              <div className="info">
                <a href={users.html_url}  target="_blank" className="info__name">{users.name}</a>
                <h3 className="info__bio">{users.bio}</h3>
                <div>
                  <span><FaUserFriends/> {users.followers} <a href={users.html_url+'?tab=followers'} target="_blank">Followers</a></span> - <span>{users.following} <a href={users.html_url+'?tab=following'} target="_blank">Following</a></span>
                </div>
                <h4 className="info__company"><FaBuilding/> {users.company}</h4>
                <h4 className="info__location"><FaMapMarkerAlt/> {users.location}</h4>
              </div>
        </Perfil>
  
        <List>
          <h2><FaDatabase/> Repositórios</h2>
          {repositorios.map(repo => (
            <li key={repo.name}>
              <span>
              {repo.name}
              </span>
              <Link to={`/repositorio/${encodeURIComponent(repo.login+'/'+repo.name)}`}>
               <FaBars size={20}/>
             </Link>
            </li>
          ))} 
        </List>
        
      </Content>
         ) : ( 
          <></>
        )}
      {load  ? (
      <Sidebar>
        <h2>Últimas Buscas</h2>
      <ul>

      {list.reverse().slice(0, 5).map(user => (
          <li key={user.name}>
            <span>
            {user.name}
            </span>
          </li>
        ))} 
      </ul>
      </Sidebar>

      ) : ( 
        <></>
      )}

    </Container>

    
  )
}