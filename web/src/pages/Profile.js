import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../services/api';

import logoImage from '../assets/logo.svg';

import Button from '../components/ButtonComponent';

export default function Profile() {

    const history = useHistory();

    const ongId = sessionStorage.getItem('id');
    const ongName = sessionStorage.getItem('ongName');

    const [incidentsState, setIncidents] = useState([]);

    useEffect( () => {

        getIncidents();

    }, []);

    async function getIncidents(){

        try {
            
            const response = await api.get('/profile', {
                headers: {
                    authorization: ongId
                }
            });

            setIncidents(response.data);

        } catch (error) {
            console.error(error);
            alert('Erro ao carregar os casos');
        }
    }

    function handleLogOut(){

        sessionStorage.clear();

        history.push('/');
    }

    async function handleDeleteIncident(id){

        try {

            await api.delete(`/incidents/${id}`, {
                headers: {
                    authorization: ongId
                }
            });

            const incidents = incidentsState.filter( (incident) => incident.id != id);

            setIncidents(incidents);
            
        } catch (error) {
            console.error(error);
            alert('Erro ao deletar, tente novamente');
        }
    }

    function renderIncidents(){

        return incidentsState.map( (incident, index) => {

            return (
                <li key={index}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color='#a8a8b3' />
                    </button>
                </li>
            );
        });
    }

    return (
        <Container>

            <header>
                <img src={logoImage} alt="logo Image"/>
                <span>Bem vinda, {ongName}</span>

                <Button onClick={() => history.push('/incidents/new')} style={{ width: 260, marginLeft: 'auto', marginTop: 0 }}>
                    Cadastrar novo caso
                </Button>
                <button id='logoff' onClick={handleLogOut}>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {renderIncidents()}
            </ul>

        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;

    header {
        display: flex;
        align-items: center;
    }

    header img {
        height: 64px;
    }

    header span {
        font-size: 20px;
        margin-left: 24px;
    }

    header button#logoff {
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;
    }

    header button#logoff:hover {
        border-color: #999;
    }

    h1 {
        margin: 80px 0 24px
    }

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        list-style: none;
    }

    ul li {
        background: #fff;
        padding: 24px;
        border-radius: 8px;
        position: relative;
    }

    ul li strong {
        display: block;
        margin: 0 0 16px 0;
        color: #41414d;
    }

    ul li strong:not(:first-child) {
        margin-top: 32px;
    }

    ul li p {
        color: #737380;
        line-height: 21px;
        font-size: 16px;
    }

    ul li button {
        position: absolute;
        right: 24px;
        top: 24px;
        border: 0;
        background: transparent;
    }

    ul li button:hover {
        opacity: 0.8;
    }
`;