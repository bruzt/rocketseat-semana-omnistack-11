import React from 'react';
import styled from 'styled-components';

export default function Input(props) {

    return (
        <InputStyled {...props} />
    );
}

const InputStyled = styled.input`
    width: 100%;
    height: 60px;
    color: #333333;
    border: 1px solid #dcdce6;
    border-radius: 8px;
    padding: 0 24px;
`;
