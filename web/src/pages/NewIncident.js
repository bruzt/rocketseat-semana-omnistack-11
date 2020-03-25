import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../services/api';

import logoImage from '../assets/logo.svg';

import Link from '../components/LinkComponent';
import Input from '../components/InputComponent';
import Button from '../components/ButtonComponent';

export default function NewIncident() {

    const history = useHistory();

    const ongId = sessionStorage.getItem('id');

    const [titleState, setTitle] = useState('');
    const [descriptionState, setDescription] = useState('');
    const [valueState, setValue] = useState(0);

    async function handleSubmit(event){
        event.preventDefault();

        const data = {
            title: titleState,
            description: descriptionState,
            value: valueState
        };

        try {
            
            await api.post('/incidents', data, {
                headers: {
                    authorization: ongId
                }
            });

            history.push('/profile');

        } catch (error) {
            console.error(error);
            alert('Erro ao criar novo caso, tente novamente')
        }
    }

    return (
        <Container>

            <div className="content">
                <section>
                    <img src={logoImage} alt="logo Image"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolvê-lo.</p>
                
                    <Link to='/profile'>
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <Input placeholder='Título do caso' value={titleState} onChange={(event) => setTitle(event.target.value)} />
                    <textarea placeholder='Descrição' value={descriptionState} onChange={(event) => setDescription(event.target.value)} />
                    <Input placeholder='Valor em reais' value={valueState} onChange={(event) => setValue(event.target.value)} />

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

    .content form input, 
    .content form textarea {
        margin: 8px 0 0 0;
    }

    .content form textarea {
        width: 100%;
        min-height: 140px;
        color: #333333;
        border: 1px solid #dcdce6;
        border-radius: 8px;
        padding: 16px 24px;
        line-height: 24px;
        resize: vertical;
    }
`;
