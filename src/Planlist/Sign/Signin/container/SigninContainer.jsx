import React, { Component } from "react";
import SigninView from "../view/SigninView";
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class SigninContainer extends Component {
  onSignin = (e, accountObj) => {
    e.preventDefault();
    const { account } = this.props.Store;

    account.signin(accountObj).then((req) => {
      if (localStorage.getItem("jwt_token")) {
        // this.props.history.push("/");
        window.location.href = "/";
      } else {
        alert("회원 정보를 확인해 주세요.");
      }
    });
  };

  render() {
    return <SigninView onSignin={this.onSignin} />;
  }
}

export default SigninContainer;
