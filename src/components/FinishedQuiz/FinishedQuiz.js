import React from "react";
import styles from "./FinishedQuiz.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = `${styles.icon} ${styles[props.results[quizItem.id]]}`;
          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {quizItem.question}
              {
                <FontAwesomeIcon
                  icon={
                    props.results[quizItem.id] === "error" ? faTimes : faCheck
                  }
                  className={cls}
                />
              }
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
