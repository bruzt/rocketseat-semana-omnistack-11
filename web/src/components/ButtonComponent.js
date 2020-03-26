import React from 'react';
import styled from 'styled-components';

export default function Button(props) {

    return (
        <ButtonStyled {...props}>
            {props.children}
        </ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    width: 100%;
    height: 60px;
    background: #e02041;
    border: 0;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    margin: 16px 0 0 0;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 60px;
    transition: filter 0.2s; 

    :hover {
        filter: brightness(90%);
    }
`;