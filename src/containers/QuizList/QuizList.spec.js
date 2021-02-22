import React from "react";
import { shallow } from "enzyme";
import { QuizList } from "./QuizList";
import QuizListConnect from "./QuizList";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("QuizList component", () => {
  let component, fetchQuizes;
  beforeEach(() => {
    fetchQuizes = jest.fn();
    component = shallow(
      <QuizList
        quizes={[
          { id: 1, name: "name" },
          { id: 2, name: "name2" },
        ]}
        fetchQuizes={fetchQuizes}
      />
    );
  });
  it("should render QuizList with quizes", () => {
    expect(component).toMatchSnapshot();
  });
  it("should render QuizList with quizes and with loading", () => {
    const component2 = shallow(
      <QuizList
        quizes={[
          { id: 1, name: "name" },
          { id: 2, name: "name2" },
        ]}
        fetchQuizes={fetchQuizes}
        loading
      />
    );
    expect(component2).toMatchSnapshot();
  });
  it("should render QuizList without quizes", () => {
    const component3 = shallow(
      <QuizList quizes={[]} fetchQuizes={fetchQuizes} />
    );
    expect(component3).toMatchSnapshot();
  });
  it("should quizes and loading in QuizList props, calls fetchQuizes", () => {
    const store = mockStore({
      quiz: {
        quizes: [
          { id: 1, name: "name" },
          { id: 2, name: "name2" },
        ],
        loading: true,
      },
    });
    const component4 = shallow(<QuizListConnect store={store} />);
    expect(component4.children().props().quizes).toBeTruthy();
    expect(component4.children().props().loading).toBeTruthy();
  });
});
