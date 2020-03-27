import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import LogoIMG from '../../assets/logo.svg'
import './styles.css';

export default function Login()
{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('OngId');

    const history = useHistory();

    async function handleNewIncident(e)
    {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('incidents', data, {
                headers: {
                    ong_id: ongId
                }
            })
            alert('deu certo');
            history.push('/profile');

        } catch (error) {
            alert('Error ao cadastrar caso');
        }
    }

    return (
        <div className="newincident-container">
            <div className="content">
                <section className="form">
                    <img src={LogoIMG} alt="be the Heroes"/>
                    <h1>Cadastrarnovo caso</h1>
                    <p>Descreva o casodetalhadamente para encontrar um heroi para resolver isso.</p>
                     <Link to="/profile" className="link">
                        <FiArrowLeft size={16} color="#e02041"/>
                         Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        value={title}
                        onChange={ e => setTitle(e.target.value)} 
                        placeholder="Titulo do caso"/>
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                         placeholder="Descrição"/>
                    <input 
                        value={value}
                        onChange={e => setValue(e.target.value)} placeholder="Valor em reais"/>
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}