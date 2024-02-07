import './End.css';

const End = ({retry, score}) => {
  return (
    <div className='end'>
        <h1>Fim de Jogo</h1>
        <h2>A sua pontuação foi: <span>{score}</span></h2>
        <button onClick={retry}>Tentar novamente</button>
    </div>
  )
}

export default End