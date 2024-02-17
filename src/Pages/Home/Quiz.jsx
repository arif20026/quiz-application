import { useEffect, useRef, useState } from "react";
import './Quiz.css'
import { data } from './quizData'

const Quiz = () => {
    let [index, setIndex] = useState(0)
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)

    // let option1 = useRef(null)
    // let option2 = useRef(null)
    // let option3 = useRef(null)
    // let option4 = useRef(null)

    // let option_array = [option1, option2, option3, option4]


    // useEffect(() => {
    //     fetch('http://localhost:5000/quiz')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             setQuizzes(data)
    //         });
    // }, []);

    // const [question, setQuestion] = useState(quizzes[index])

    // const handleCheckAnswer =(quizzes[0].options[0]) =>{
    //     console.log()
    // }

    const handleNext = () => {
        // if (index < data.length - 1) {
        console.log(index)
        // Remove class lists from previous options
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('correct', 'wrong');
        });
        setIndex(++index)
        setQuestion(data[index])
        setLock(false)

        // }

    }
    const handleCheckAnswer = (e, selected) => {
        if (lock === false) {

            if (question?.ans === selected) {
                e.target.classList.add('correct')
                console.log('correct')
                setLock(true)
                setScore(prev => prev + 1)

            }

            else {

                e.target.classList.add('wrong')
                console.log('wrong')
                setLock(true)
                const correctOption = e.currentTarget.parentElement.querySelector(`[data-option="${question.ans}"]`);
                if (correctOption) correctOption.classList.add('correct');
                // quizzes[index].correctAnswer.classList.add('correct')
                // let correctAns = quizzes[index].correctAnswer
                // option_array[(question.ans) - 1]?.current?.classList.add('correct')

            }
        }

    }

    const handleReset = () => {
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
    }

    return (
        <div className="container ">
            <div className="w-[640px] mx-auto  bg-white flex flex-col gap-3 px-[20px] py-[40px]  text-center rounded-md ">
                <h3 className="font-bold text-2xl">Quiz App</h3>
                <hr />
              
                {
                    index < data.length ?
                        <div>

                            <h3 className="font-bold text-[27px] mb-2">Q.{index + 1} {question?.question}</h3>
                            <ul className="cursor-pointer">
                                <li className="option" data-option={question.option1} onClick={(e) => handleCheckAnswer(e, question.option1)}> {question?.option1} </li>
                                <li className="option" data-option={question.option2} onClick={(e) => handleCheckAnswer(e, question.option2)}> {question?.option2} </li>
                                <li className="option" data-option={question.option3} onClick={(e) => handleCheckAnswer(e, question.option3)}> {question?.option3} </li>
                                <li className="option" data-option={question.option4} onClick={(e) => handleCheckAnswer(e, question.option4)}> {question?.option4} </li>



                            </ul>

                            <button className="btn m-auto w-20 bg-gradient-to-r from-cyan-500 to-blue-500 mb-2 " onClick={handleNext}>Next </button>
                            <div className="index">
                                Question {index + 1} out of {data.length}
                            </div>

                        </div>
                        :
                        <div className="flex flex-col items-center justify-center">
                            <h3>Your Score: <span className="font-bold">{score}</span> out of <span className="font-bold">{data.length}</span></h3>
                            <button className="btn   m-auto bg-gradient-to-r from-cyan-500 to-blue-500 my-4" onClick={handleReset}>Reset</button>


                        </div>

                }
            </div>

        </div>


    );
};

export default Quiz;