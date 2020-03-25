import React, { useState } from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

import logoImage from '../assets/logo.svg';

import Link from '../components/LinkComponent';
import Input from '../components/InputComponent';
import Button from '../components/ButtonComponent';

export default function Register() {

    const history = useHistory();

    const [nameState, setName] = useState('');
    const [emailState, setEmail] = useState('');
    const [whatsappState, setWhatsapp] = useState('');
    const [cityState, setCity] = useState('');
    const [ufState, setUf] = useState('');

    async function handleRegister(event){
        event.preventDefault();

        const data = {
            name: nameState,
            email: emailState,
            whatsapp: whatsappState,
            city: cityState,
            uf: ufState,
        };

        try {
            
            const response = await api.post('/ongs', data);

            alert('Seu ID de acesso: ' + response.data.id);
    
            history.push('/');

        } catch (error) {
            console.error(error);
            alert('Erro no cadastro');
        }
    }

    return (
        <Container>

            <div className="content">
                <section>
                    <img src={logoImage} alt="logo Image"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                
                    <Link to='/'>
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <Input 
                        placeholder='Nome da ONG' 
                        value={nameState} 
                        onChange={(event) => setName(event.target.value)} 
                    />
                    <Input 
                        type='email' 
                        placeholder='e-mail' 
                        value={emailState} 
                        onChange={(event) => setEmail(event.target.value)} 
                    />
                    <Input 
                        placeholder='Whatsapp' 
                        value={whatsappState} 
                        onChange={(event) => setWhatsapp(event.target.value)} 
                    />

                    <div className="input-group">
                        <Input 
                            placeholder='Cidade' 
                            value={cityState} 
                            onChange={(event) => setCity(event.target.value)} 
                        />
                        <Input 
                            placeholder='UF' 
                            style={{ width: 80 }} 
                            value={ufState} 
                            onChange={(event) => setUf(event.target.value)} 
                        />
                    </div>

                    <Button type='submit'>Cadastrar</Button>
                </form>
            </div>

        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
    
    .content {
        width: 100%;
        padding: 96px;
        background: #f0f0f5;
        box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
        border-radius: 8px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content section {
        width: 100%;
        max-width: 380px;
    }

    .content section h1 {
        margin: 64px 0 32px 0;
        font-size: 32px;
    }

    .content section p {
        font-size: 18px;
        color: #737380;
        line-height: 32px;
    }

    .content form {
        width: 100%;
        max-width: 450px;
    }

    .content form input {
        margin: 8px 0 0 0;
    }

    .content form .input-group {
        display: flex;
    }

    .content form .input-group input + input {
        margin-left: 8px;
    }
`;
