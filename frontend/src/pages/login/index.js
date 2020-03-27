import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api';

import heroes from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login()
{
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleSubmit(e)
    {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('OngId', id);
            localStorage.setItem('OngName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('falha');
        }
    }
    return (
        <div className="login-container">
            
            <section className="form">
            <img src={logo} alt="be the hero"/>
            <form onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>
                <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}                
                />
                <button className="button" type="submit">Entrar</button>
                <Link className="link" to="/register">
                    <FiLogIn size={16} color="#e02041"/>
                    Não tenho cadastro
                </Link>
            </form>

            </section>
            <img src={heroes} alt="heroes"/>
        </div>
    );
}