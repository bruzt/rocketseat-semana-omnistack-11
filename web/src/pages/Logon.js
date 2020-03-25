import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../services/api';

import heroesImage from '../assets/heroes.png';
import logoImage from '../assets/logo.svg';

import SubmitButton from '../components/ButtonComponent';
import Input from '../components/InputComponent';
import Link from '../components/LinkComponent';

export default function Logon() {

    const history = useHistory();

    const [idState, setId] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        try {

            const response = await api.post('/session', {
                id: idState
            });

            sessionStorage.setItem('id', idState);
            sessionStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        
        } catch (error) {
            console.error(error);
            alert("Falha no login, tente novamente");
        }
    }

    return (
        <Container>

            <section className="form">

                <img src={logoImage} alt="logo Image"/>

                <form onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input type="text" placeholder='Sua ID' value={idState} onChange={(event) => setId(event.target.value)} />

                    <SubmitButton type='submit'>Entrar</SubmitButton>

                    <Link to='/register'>
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImage} alt="heroes Image" />
            
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
    justify-content: space-between;

    section.form {
        width: 100%;
        max-width: 350px;
    }

    section.form form {
        margin: 100px 0 0 0;
    }

    section.form form h1 {
        font-size: 32px;
        margin: 0 0 32px 0;
    }
`;
