import React from "react";
import { shallow } from "enzyme";
import { Logout, mapDispatchToProps } from "./Logout";
import configureStore from "redux-mock-store";
import { ActionTypes } from "../../store/actions/ActionTypes";

const mockStore = configureStore();
const store = mockStore({});

describe("Logout component", () => {
  it("should render Logout without props", () => {
    const component = shallow(<Logout />);
    expect(component).toMatchSnapshot();
  });
  it("should logout", () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).logout();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: ActionTypes.AUTH_LOGOUT,
    });
  });
  it("should call the mock logout function", () => {
    const mockLogoutFn = jest.fn();
    const component = shallow(<Logout logout={mockLogoutFn} />);
    component.unmount();
    expect(mockLogoutFn.mock.calls.length).toBe(1);
  });
});
