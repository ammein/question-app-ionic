import axios from 'axios';

const QuestionInstance = axios.create({
    baseURL: "https://question-mm-app.firebaseio.com/"
});

export default QuestionInstance;