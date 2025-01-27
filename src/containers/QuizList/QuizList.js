import React, { Component } from "react";
import styles from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader";
import { BASE_URL } from "../../Constants/Constants";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

export class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }
  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
