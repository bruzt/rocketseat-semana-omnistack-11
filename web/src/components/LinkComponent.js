import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function LinkComponent({ to, children, style }) {
    
    return (
        <LinkStyled to={to} style={style}>
            {children}
        </LinkStyled>
    );
}

const LinkStyled = styled(Link)`
    display: flex;
    align-items: center;
    margin: 40px 0 0 0;
    color: #41414d;
    font-size: 18px;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s;
    
    :hover {
        opacity: 0.8;
    }

    svg {
        margin: 0 8px 0 0;
    }
`;