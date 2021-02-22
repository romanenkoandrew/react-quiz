import { shallow } from "enzyme";
import { Auth } from "./Auth";

describe("Auth component", () => {
  let auth, component, instance;
  beforeEach(() => {
    auth = jest.fn();
    component = shallow(<Auth auth={auth} />);
    instance = component.instance();
  });
  it("Auth component", () => {
    expect(component).toMatchSnapshot();
  });
  it("should call method submitHandler", () => {
    const e = { preventDefault: jest.fn() };
    instance.submitHandler(e);
    expect(e.preventDefault).toBeCalledTimes(1);
  });
  it("should call auth in method loginHandler", () => {
    instance.loginHandler();
    expect(auth).toBeCalledTimes(1);
  });
  it("should call auth in method registerHandler", () => {
    instance.registerHandler();
    expect(auth).toBeCalledTimes(1);
  });
  it("should call the validateControl method without validation", () => {
    expect(instance.validateControl("value")).toBe(true);
  });
  it("should call the validateControl method with validation", () => {
    expect(
      instance.validateControl("test@mail.ru", {
        required: true,
        minLength: 5,
        email: "test@mail.ru",
      })
    ).toBe(true);
  });
  it("should call the validateControl method with validation and empty value", () => {
    expect(
      instance.validateControl("", {
        required: false,
        minLength: 0,
        email: "",
      })
    ).toBe(true);
  });
  it("should call method onChangeHandler in Auth", () => {
    const e = { target: { value: 1 } };
    instance.setState({ formControls: { controlName: {} } });
    instance.onChangeHandler(e, "controlName");
    expect(instance.state.formControls.controlName.touched).toBe(true);
    expect(instance.state.formControls.controlName.value).toBe(1);
    expect(instance.state.formControls.controlName.valid).toBe(true);
    expect(instance.state.isFormValid).toBe(true);
  });
});
