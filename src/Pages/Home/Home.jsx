import { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Home = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [results, setResults] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        fetch('http://localhost:5000/quiz')
            .then(res => res.json())
            .then(data => setQuizzes(data));
    }, []);

    const handleOptionChange = (event, index) => {
        const { value } = event.target;
        setSelectedOptions(prevState => ({ ...prevState, [index]: value }));
    };

    const handleSubmit = () => {
        axiosPublic.post('/userAnswers', selectedOptions)
            .then(res => {
                    console.log(res.data)
                // setResults(res.data);   
            })
            .catch(err => {
                console.error('Error submitting answers:', err);
            });

            axiosPublic.get('/userAnswers')
            .then( res => {
                setResults(res.data)
                console.log(results)
                // console.log(setResults)
            })
    }

    

    return (
        <div className="mx-20">
            <h3>This is home</h3>
            <h3>Total quiz : {quizzes.length}</h3>

            {quizzes.map((quiz, index) => (
                <div key={quiz._id}>
                    <h3 className="font-bold">{index + 1}. {quiz.question}</h3>
                    <div>
                        {quiz.options.map((option, optionIndex) => (
                            <div key={`${option}-${optionIndex}`}>
                                <input
                                    type="radio"
                                    name={`quiz-${index}`}
                                    value={option}
                                    checked={selectedOptions[index] === option}
                                    onChange={(e) => handleOptionChange(e, index)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                  
                    {/* Show result after submission */}
                    {results[index] && (
                        <div>
                            <p>{results[index]=== quiz.correctAnswer ? "Correct" : "Wrong"}</p>
                        </div>
                    )}
                </div>
            ))}

            <button className="btn btn-primary my-4" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default Home;
