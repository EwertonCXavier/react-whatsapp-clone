import React from 'react';
import './ChatIntro.css';
import mobile_photo from './whatsapp-mobile-photo';
import whatsapp_light from './whatsapp-light.jpg';

export default () => {
    return (
        <div className="chatIntro">
            <img src={whatsapp_light} alt="Imagem do zap"></img>
            {/* <img src="https://web.whatsapp.com/img/intro-connection-hq-dark_f8cb12a6fc73afaf9d5903b7849bebd6.jpg" alt="zap image"></img> */}
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conecta ao seu telefone para sincronizar suas mensagens. Para reduzir o uso de dados, conecte eu telefone a uma rede Wi-Fi</h2>
        </div>
    )
}