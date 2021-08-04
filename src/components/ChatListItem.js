import React from 'react';
import './ChatListItem.css';
export default () => {
    return (
        <div className="chatListItem">
            <img className="chatListItem--avatar" src="https://image.flaticon.com/icons/png/128/168/168724.png" alt="" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">Ewerton Xavier</div>
                    <div className="chatListItem--date">19:00</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>Vamo com tudo!!!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}