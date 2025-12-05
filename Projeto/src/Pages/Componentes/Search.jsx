import styles from "./Search.module.css";
const SearchQ = ({quizzesSearch, setQuizzesSearch}) => {
    return(
    <div className={`${styles.searchContainer} ${styles.searchControlQuiz}`}>

      <input
        type="text"
        value={quizzesSearch}
        placeholder="pesquisar quiz"
        onChange={(e) => setQuizzesSearch(e.target.value)}
      />
    </div>
    )
}
const SearchP = ({quizzesPergunta, setPerguntasSearch}) => {
    return(
    <div className={`${styles.searchContainer} ${styles.searchControlPergunta}`}>
      <input
        type="text"
        value={quizzesPergunta}
        placeholder="pesquisar pergunta"
        onChange={(e) => setPerguntasSearch(e.target.value)}
      />
    </div>
    )
}
const searchQuizz = (quizzesSearch, quizzes) => {
    if (!quizzesSearch) return quizzes;
    return quizzes.filter(
      (q) =>
        q.nome.toLowerCase().includes(quizzesSearch.toLowerCase()) ||
        q.descricao.toLowerCase().includes(quizzesSearch.toLowerCase()) 
    );
  };
const searchPergunta = (perguntasSearch, perguntas) => {
    if (!perguntasSearch) return perguntas;
    return perguntas.filter(
      (q) =>
        q.descricao.toLowerCase().includes(perguntasSearch.toLowerCase())
    );
  };
export  {SearchQ, SearchP, searchQuizz, searchPergunta};