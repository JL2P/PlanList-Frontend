import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Menu, Container, Label } from "semantic-ui-react";
import TodoCreateDesktopForm from "../../../todo/view/TodoCreateDesktopForm";
import ProfileTodoCompletedListContainer from "../container/ProfileTodoCompletedListContainer";
import ProfileTodoFromNowListContainer from "../container/ProfileTodoFromNowListContainer";
import ProfileTodoIncompletedListContainer from "../container/ProfileTodoIncompletedListContainer";
import ProfileFollowRequestListContainer from "../container/ProfileFollowRequestListContainer";
import ProfileCalendarContainer from "../container/ProfileCalendarContainer";
import MyAchievementRateContainer from "../container/MyAchievementRateContainer";

@inject("Store")
@observer
class ProfileTodoView extends Component {
  state = { activeItem: "해야 할 일" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
    };

    //todo 생성
    todo.saveTodo(newTodo);
    //입력 모달창 닫기
    this.onModal(false);
  };

  render() {
    const { activeItem } = this.state;
    const {
      selectUser,
      loginAccount,
      selectedTodo,
      selectUserTodos,
      onLikeButton,
      onFollowConfirm,
      onComplete,
      onIncomplete,
      onAddPoint,
      onDeletePoint,
      onAddGroupPoint,
      onDeleteGroupPoint,
      account,
      notConfirmFollowers,
    } = this.props;
    const { open, todoTitle } = this.state;
    const today = this.props.Store.todo.getToday;
    return (
      <div>
        <TodoCreateDesktopForm
          open={open}
          title={todoTitle}
          onModal={this.onModal}
          onChangeTitle={this.changeTodoTitle}
          createTodo={this.createTodo}
          today={today}
        />

        <Container style={{ width: "900px", marginTop: "2em" }}>
          <Menu pointing secondary>
            <Menu.Item
              name="해야 할 일"
              active={activeItem === "해야 할 일"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="그동안 한 일"
              active={activeItem === "그동안 한 일"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="하지 못한 일"
              active={activeItem === "하지 못한 일"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="달력 보기"
              active={activeItem === "달력 보기"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="나의 점수표"
              active={activeItem === "나의 점수표"}
              onClick={this.handleItemClick}
            />
            {selectUser === loginAccount ||
            account.accountId === loginAccount.accountId ? ( // 로그인된 account의 마이페이지에서만 할 일 작성할 수 있음
              <>
                <Menu.Item
                  name="새로운 알림"
                  active={activeItem === "새로운 알림"}
                  onClick={this.handleItemClick}
                >
                  새로운 알림
                  {notConfirmFollowers.length > 0 && (
                    <Label color="red" floating>
                      {notConfirmFollowers.length}
                    </Label>
                  )}
                </Menu.Item>

                <Menu.Menu position="right">
                  <Menu.Item
                    icon="pencil"
                    name="할 일 작성"
                    onClick={() => this.onModal(true)}
                  />
                </Menu.Menu>
              </>
            ) : (
              ""
            )}
          </Menu>

          <div>
            {activeItem === "해야 할 일" && (
              <ProfileTodoFromNowListContainer
                selectUser={selectUser}
                selectedTodo={selectedTodo}
                onLikeButton={onLikeButton}
                todos={selectUserTodos}
                onComplete={onComplete}
                onIncomplete={onIncomplete}
                onAddPoint={onAddPoint}
                onDeletePoint={onDeletePoint}
                onAddGroupPoint={onAddGroupPoint}
                onDeleteGroupPoint={onDeleteGroupPoint}
              />
            )}
            {activeItem === "그동안 한 일" && (
              <ProfileTodoCompletedListContainer
                selectUser={selectUser}
                selectedTodo={selectedTodo}
                onLikeButton={onLikeButton}
                todos={selectUserTodos}
                onComplete={onComplete}
                onIncomplete={onIncomplete}
                onAddPoint={onAddPoint}
                onDeletePoint={onDeletePoint}
                onAddGroupPoint={onAddGroupPoint}
                onDeleteGroupPoint={onDeleteGroupPoint}
              />
            )}
            {activeItem === "하지 못한 일" && (
              <ProfileTodoIncompletedListContainer
                selectUser={selectUser}
                loginAccount={loginAccount}
                selectedTodo={selectedTodo}
                onLikeButton={onLikeButton}
                todos={selectUserTodos}
                onComplete={onComplete}
                onIncomplete={onIncomplete}
                onAddPoint={onAddPoint}
                onDeletePoint={onDeletePoint}
              />
            )}
            {activeItem === "달력 보기" && (
              <ProfileCalendarContainer
                selectUser={selectUser}
                todos={selectUserTodos}
              />
            )}
            {activeItem === "나의 점수표" && (
              <MyAchievementRateContainer selectUser={selectUser} />
            )}
            {activeItem === "새로운 알림" && (
              <ProfileFollowRequestListContainer
                selectUser={selectUser}
                onFollowConfirm={onFollowConfirm}
              />
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default ProfileTodoView;
