import React, { Component } from "react";
import styles from "./Layout.module.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {
  state = { menu: false };
  onToggle = () => {
    this.setState({ menu: !this.state.menu });
  };
  menuCloseHandler = () => {
    this.setState({ menu: false });
  };
  render() {
    return (
      <div className={styles.Layout}>
        <Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler} />
        <MenuToggle onToggle={this.onToggle} isOpen={this.state.menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
