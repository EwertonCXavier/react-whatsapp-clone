import React, {useState, useEffect} from 'react';
import './App.css';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow.js';
import NewChat from './components/NewChat';
import Login from './components/Login';
import Api from './Api';


export default () => {

  const [chatlist, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({}); //Verifica se tem um chat ativo ou não

  // Como deixar um usuário previamente cadastrado como abertura default:
  //  Muda o estado de null para algum usuário
  const [user, setUser] = useState(null);

  

  const [showNewChat, setShowNewChat] = useState(false);

  useEffect( () => {
    if(user !== null){
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user]);

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser);
    // Adicionar o cara no banco de dados
    setUser(newUser);
  }

  if (user === null){
    console.log(user);
    return (<Login onReceive={handleLoginData}/>);
  }



  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          chatlist={chatlist}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        
        />
        <header>
          
          <img className="header--avatar" src={user.avatar} alt=""></img>
          
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon fontSize="large" style={{color: '#919191'}} />
            </div>
            <div
              onClick={handleNewChat}
              className="header--btn">
              <ChatIcon fontSize="large" style={{color: '#919191'}} />
            </div>
            <div className="header--btn">
              <MoreVertIcon fontSize="large" style={{color: '#919191'}} />
            </div>

          </div> 
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{color: '#919191'}} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa" />
          </div>
        </div>
        <div className="chatlist">
          {chatlist.map((item, key) => (
            <ChatListItem 
              key={key}
              data={item}
              active={activeChat.chatId === chatlist[key].chatId}
              onClick={() => setActiveChat(chatlist[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentarea">
        {
          activeChat.chatId !== undefined &&
            <ChatWindow
              user={user}
              data={activeChat}
            />
        }
        {
          activeChat.chatId === undefined &&
            <ChatIntro />
        }
        
      </div>
    </div>
  )
}