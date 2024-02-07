import React from 'react';
import './Game.css';
import {useState, useRef} from 'react';

const Game = ( {verifyLetter, pickedWord, pickedCategory, guessedLetters, wrongLetters, guesses, score, letters } ) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null) ;

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    
    setLetter(""); // zerando o campo após adicionar valor]

    letterInputRef.current.focus(); // focando o teclado do usuário no campo a cada submit para melhor a ux
  }

  return (
    <div className='game'>
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra</h1>
        <h3 className="dica">
            Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s)!</p>
        <div className="wordContainer">
            {letters.map((letter, i) => (
                guessedLetters.includes(letter) ? (
                    <span key={i} className="letter">{letter}</span>
                ) : (
                    <span key={i} className="blankSquare"></span>
                )
            ))}

        </div>
        <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="letter" 
                    maxLength="1" 
                    required 
                    onChange={(e) => setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputRef}
                />
                <button>Jogar</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras já jogadas: </p>
            {wrongLetters.map((letter, i) => (

                <span key={i}>{letter}, </span>

            ))}


        </div>

    </div>
  )
}

export default Game