import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';

import LogoIMG from '../../assets/logo.svg'

import './styles.css';

export default function Profile() {
    const ongId = localStorage.getItem('OngId');
    const ongName = localStorage.getItem('OngName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        api.get('profiles', {
            headers:{
                ong_id: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    },[ongId]);
    
    async function handleDeletIncident(id) {
        try {
            await api.delete(`incidents/ ${id}`,{
                headers: {
                    ong_id: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('error ao deletar caso');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoIMG} alt="be the hero"/>
                <span>Bem vindo a, {ongName} de id {ongId}</span>
                <Link to="/incident/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button onClick={()=> handleDeletIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}