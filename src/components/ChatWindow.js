import React, {useState, useEffect, useRef} from 'react';
import './ChatWindow.css';
import EmojiPicker from 'emoji-picker-react';
import Api from '../Api'

import MessageItem from './MessageItem';


import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';



export default ({user, data}) => {

    const body = useRef();


    // Verifica se tem reconhecimento de voz no navegador
    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();

        console.log(SpeechRecognition);

    }


    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    
    
    useEffect( () => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);
    
    
    
    useEffect( () => {
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);


    
    const handleEmojiClick = (e, emojiObject) => {
        setText( text + emojiObject.emoji);
        console.log(emojiObject);
    }

    // Função criada para abertura dos Emojis
    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    // Função criada para permitir o fechamento do menu de Emojis
    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }


    const handleInputKeyUp = (e) => {
        if(e.keyCode == 13){
            handleSendClick();
        }
    }

    //Função criada para permitir que o ícone de enviar envie dados para a tela
    const handleSendClick = () => {
        if(text !== ''){
            Api.sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }

    const handleMicClick = () => {
        if(recognition !== null) {

            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }

            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript );
            }

            recognition.start();
        }
        if(recognition === null ){
            console.log(recognition);
        }


    }

    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                
                <div className="chatWindow--headerinfo">
                    <img className="chatWindow--avatar" src={data.image} alt=""></img>
                    <div className="chatWindow--name">{data.title}</div>
                </div>

                <div className="chatWindow--headerbuttons">

                    <div className="chatWindow--btn">
                        <SearchIcon fontSize="large" style={{color: '#919191'}} />
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon fontSize="large" style={{color: '#919191'}} />
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon fontSize="large" style={{color: '#919191'}} />
                    </div>
                    
                        
                </div>
            </div>
            <div ref={body} className="chatWindow--body">
                {list.map((item, key) => (
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />    
                ))}
            </div>

            <div className="chatWindow--emojiarea" style={{
                height: emojiOpen ? '20rem' : '0rem'
            }}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>


            <div className="chatWindow--footer">
                <div className="chatWindow--pre">

                    <div className="chatWindow--btn"
                        onClick={handleCloseEmoji}
                        style={{width: emojiOpen ? 40:0}}
                    >
                        <CloseIcon fontSize="large" style={{color: '#919191'}} />
                    </div>

                    <div 
                        className="chatWindow--btn"
                        onClick={handleOpenEmoji}
                    >
                        
                        <InsertEmoticonIcon fontSize="large" style={{color: emojiOpen ? '006988' : '#919191' }} />
                    </div>
                    
                </div>
                <div className="chatWindow--inputarea">
                    <input
                        className="chatWindow--input"
                        type="text"
                        placeholder="Digite uma mensagem"
                        value={text}
                        onChange={e => setText(e.target.value)} /* Padrão JS */
                        onKeyUp={handleInputKeyUp}
                    ></input>
                </div>
                <div className="chatWindow--pos">
                    {text === '' && 
                        <div onClick={handleMicClick} className="chatWindow--btn">
                            <MicIcon fontSize="large" style={{color: listening ? '#126ece' : '#919191'}} />
                        </div>
                    }
                    {
                        text !== '' &&
                        <div onClick={handleSendClick} className="chatWindow--btn">
                            <SendIcon fontSize="large" style={{color: '#919191'}} />
                        </div>
                    }
                    
                </div>

            </div>
        </div>
    )
}