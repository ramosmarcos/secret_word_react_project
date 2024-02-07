// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import  { wordsList }  from './data/words';
 
// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import End from './components/End';


// Stages do jogo, para controlar as telas
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]


function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //pegar um categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    // pegar uma palavra aleatória dentro da categoria selecionada
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return {word, category};
  }, [words]);


  // Dá start no game
  const startGame = useCallback(() => {

    // limpa todas as letras, se estivermos iniciando de um restart
    clearLetterStates();

    //pick word & category
    const { word, category } = pickWordAndCategory();

    //criando um array de letras

    let wordLetters = word.split('');

    wordLetters = wordLetters.map((l) => l.toLowerCase()); // normalizando a palavra tirando as letras maiúsculas

    console.log(word, category);
    console.log(wordLetters)

    // setando os states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name); 
  }, [pickWordAndCategory]);

  // processa o input da letra
  const verifyLetter = (letter) => {

    //normalizando a letra
    const normalizedLetter = letter.toLowerCase();

    //checando se a letra já foi utilizada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    //mandando as letras guessed ou removendo uma chance
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ])
      // diminuindo as tentativas
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => { // dando game over quando as tentativas acabarem

    if (guesses <= 0 ) {
      // resetando todos os states porque o usuário perdeu o jogo
      clearLetterStates()

      // mandando para a tela de game over
      setGameStage(stages[2].name);
    }

  }, [guesses])

  // checando a vitória
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)] //normalizando retirando as letras possivelmente repetidas

    // win condition
    if(guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => actualScore += 100)
      // restart game com nova palavra
      startGame();
    }

  },[guessedLetters, letters, startGame])


  console.log(wrongLetters);

  // Gameover retry (restart no jogo)
  const retry = () => {
    setScore(0);
    setGuesses(3);

    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} /* Leva a função que muda a tela para o game, como prop children para ser alocada ao onClick do botão de start */ />}
      {gameStage === 'game' && <Game 
        verifyLetter={verifyLetter} 
        pickedWord = {pickedWord} 
        pickedCategory={pickedCategory} 
        guessedLetters={guessedLetters} 
        wrongLetters={wrongLetters} 
        guesses = {guesses} 
        score={score}
        letters={letters}
      />}
      {gameStage === 'end' && <End retry={retry} score={score} />}

    </div>
  );
}

export default App;
