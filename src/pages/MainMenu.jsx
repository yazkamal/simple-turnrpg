import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
    const navigate = useNavigate();

    const startGame = () => {
      navigate("/chapters");
    };
  
    return (
      <div className="main-menu">
        <h1>My RPG Game</h1>
        <button onClick={startGame}>Start Game</button>
      </div>
    );
}
