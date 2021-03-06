import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import TodoCreateDesktopForm from "../../todo/view/TodoCreateDesktopForm";
import MainNoTodoView from "../View/MainNoTodoView";

@inject("Store")
@observer
class MainNoTodoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoTitle: "",
      open: false,
    };
  }

  onModal = (flag) => {
    this.setState({ open: flag });
  };

  changeTodoTitle = (e) => {
    this.setState({ todoTitle: e.target.value });
  };

  onEnterModal = (e) => {
    if (e.key === "Enter") {
      // todo 모달 열기
      this.setState({ open: true });
    }
  };

  //Todo 생성
  createTodo = (e, todoObj) => {
    e.preventDefault(); // 기본적인 서브밋 행동을 취소

    const { todo } = this.props.Store;
    const random_image_number = Math.floor(Math.random() * 99 + 1);

    //랜덤 이미지와 가상의 유저명으로 지정
    const newTodo = {
      ...todoObj,
      imgUrl: `/posts/test_img_${random_image_number}.jpg`,
      writer: "shoon2430",
    };

    //todo 생성
    todo.saveTodo(newTodo);
    //입력 모달창 닫기
    this.onModal(false);
  };

  render() {
    const { open, todoTitle } = this.state;
    const today = this.props.Store.todo.getToday;

    return (
      <div>
        <MainNoTodoView onCreateTodoModal={this.onModal} />
        <TodoCreateDesktopForm
          open={open}
          onModal={this.onModal}
          title={todoTitle}
          onChangeTitle={this.changeTodoTitle}
          createTodo={this.createTodo}
          today={today}
        />
      </div>
    );
  }
}

export default MainNoTodoContainer;
