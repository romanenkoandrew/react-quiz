import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/auth";

export class Logout extends React.Component {
  componentWillUnmount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
