import React from 'react';
import './ChatWindow.css';
import EmojiPicker from 'emoji-picker-react';


import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';



export default () => {

    const handleEmojiClick = () => {
        
    }

    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                
                <div className="chatWindow--headerinfo">
                    <img className="chatWindow--avatar" src="https://image.flaticon.com/icons/png/128/168/168724.png" alt=""></img>
                    <div className="chatWindow--name">Ewerton Xavier</div>
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
            <div className="chatWindow--body">

            </div>

            <div className="chatWindow--emojiarea">
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>


            <div className="chatWindow--footer">
                <div className="chatWindow--pre">

                    <div className="chatWindow--btn">
                        <CloseIcon fontSize="large" style={{color: '#919191'}} />
                    </div>

                    <div className="chatWindow--btn">
                        <InsertEmoticonIcon fontSize="large" style={{color: '#919191'}} />
                    </div>
                    
                </div>
                <div className="chatWindow--inputarea">
                    <input
                        className="chatWindow--input"
                        type="text"
                        placeholder="Digite uma mensagem"
                    ></input>
                </div>
                <div className="chatWindow--pos">
                    <div className="chatWindow--btn">
                        <SendIcon fontSize="large" style={{color: '#919191'}} />
                    </div>
                </div>

            </div>
        </div>
    )
}