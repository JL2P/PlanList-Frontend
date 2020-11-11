import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import MainNoTodoContainer from "../../../Main/Container/MainNoTodoContainer";
import MainTodoCreateDesktopContainer from "../../../Main/Container/MainTodoCreateDesktopContainer";
import ProfileTodoFromNowListView from "../view/ProfileManageItem/ProfileTodoFromNowListView";
import ProfileTodoEmptyView from "../view/ProfileTodoEmptyView";

@inject("Store")
@observer
class ProfileTodoFromNowListContainer extends Component {
  // componentDidMount() {
  //   this.props.Store.todo.getApiTodos();
  // }

  selectedTodo = (todoModel) => {
    const { todo } = this.props.Store;
    todo.setTodo(todoModel);
    todo.setComments(todoModel.comments);
  };

  onLikeButton = (todoId, action) => {
    const { todo } = this.props.Store;
    if (action === "ADD") {
      todo.addLike(todoId);
    } else {
      todo.removeLike(todoId);
    }
  };

  render() {
    //기능들구현해서 prop로 넘겨주는 작업
    const { todo, account } = this.props.Store;
    const { selectUser } = this.props;
    const selectId = selectUser.accountId;
    const loginId = account.getLoginAccount.accountId;
    const todos = todo.getTodos;
    const today = todo.getToday;

    // 앞으로 해야 할 일 리스트를 종료 날짜별로 정렬
    const fromNow = todos
      .filter((item) => item.writer === selectId)
      .filter((item) => item.endTime >= today)
      .sort((a, b) => (a.endTime > b.endTime ? 1 : -1));

    // 앞으로 해야 할 일 종료 날짜를 담은 리스트
    const fromNow_date = [];
    fromNow.map((item) => {
      if (!fromNow_date.includes(item.endTime)) {
        fromNow_date.push(item.endTime);
      }
    });

    // 앞으로 해야 할 일을 종료 날짜별로 묶음
    const fromNow_list = fromNow_date.map((item) => []);
    fromNow.map((item) =>
      fromNow_list[fromNow_date.indexOf(item.endTime)].push(item)
    );

    const count = fromNow_list.length;

    return (
      <div>
        {count === 0 ? ( // 등록된 todo가 없을 때
          <div>
            {loginId === selectId ? (
              // 로그인된 계정의 페이지이면 todo 추가 화면
              <MainNoTodoContainer />
            ) : (
              // 다른 사용자이면 empty 화면
              <ProfileTodoEmptyView />
            )}
          </div>
        ) : (
          // 등록된 todo가 있으면 todo 보여줌
          <ProfileTodoFromNowListView
            fromNow_list={fromNow_list}
            fromNow_date={fromNow_date}
            selectedTodo={this.selectedTodo}
            onLikeButton={this.onLikeButton}
          />
        )}
      </div>
    );
  }
}

export default ProfileTodoFromNowListContainer;
