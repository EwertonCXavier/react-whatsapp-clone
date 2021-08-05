import React, {useState, useEffect} from 'react';
import './App.css';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow.js'


export default () => {

  const [chatlist, setChatList] = useState([
    {
      chatId: 1,
      title: 'Fulano de tal',
      image: 'https://image.flaticon.com/icons/png/128/168/168724.png'
    },
    {
      chatId: 2,
      title: 'Fulano de tal',
      image: 'https://image.flaticon.com/icons/png/128/168/168724.png'
    },
    {
      chatId: 3,
      title: 'Fulano de tal',
      image: 'https://image.flaticon.com/icons/png/128/168/168724.png'
    },
    {
      chatId: 4,
      title: 'Fulano de tal',
      image: 'https://image.flaticon.com/icons/png/128/168/168724.png'
    },

  ]);
  const [activeChat, setActiveChat] = useState({}); //Verifica se tem um chat ativo ou não


  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          
          <img className="header--avatar" src="https://image.flaticon.com/icons/png/128/168/168724.png" alt=""></img>
          
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon fontSize="large" style={{color: '#919191'}} />
              <ChatIcon fontSize="large" style={{color: '#919191'}} />
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
            <ChatWindow />
        }
        {
          activeChat.chatId === undefined &&
            <ChatIntro />
        }
        
      </div>
    </div>
  )
}