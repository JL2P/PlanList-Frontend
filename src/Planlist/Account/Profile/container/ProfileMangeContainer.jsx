import React, { Component } from "react";
import ProfileManageView from "../view/ProfileManageView";
import { inject, observer } from "mobx-react";

@inject("Store")
@observer
class ProfileMangeContainer extends Component {
  componentDidMount = () => {
    const { follow, point } = this.props.Store;
    const { selectUser } = this.props;
    follow.getApiFollowers(selectUser.accountId);
    follow.getApiFollowings(selectUser.accountId);

    //
    follow.followingPageCheck(selectUser.accountId);

    // point.myTotalPoint(selectUser.accountId);
    point.myRanking(selectUser.accountId);
  };

  onSetAccountProp = (key, value) => {
    const { account } = this.props.Store;
    account.setAccountProp(key, value);
  };

  //승훈 수정
  //정보 수정시 파일이 있을경우도 추가
  onModifyUser = (user, file) => {
    const { account } = this.props.Store;
    account.userModify(user, file);
  };

  onDeleteUser = (accountId) => {
    const { account } = this.props.Store;
    account.userRemove(accountId).then((res) => {
      alert("회원탈퇴 되었습니다.");
      window.location.href = "/signin";
    });
  };

  onSignout = () => {
    const { account } = this.props.Store;
    account.signout();
    alert("로그아웃 되었습니다.");
    window.location.href = "/signin";
  };

  onFollow = (followId) => {
    const { follow } = this.props.Store;
    follow.follow(followId);
    alert("팔로우 요청되었습니다.");
    window.location.reload();
  };

  onDeleteMyFollowing = (followId) => {
    const { follow } = this.props.Store;
    follow.deleteMyFollowing(followId);
    alert("팔로우 요청이 취소되었습니다.");
    window.location.reload();
  };

  render() {
    //기능들구현해서 prop로 넘겨주는 작업
    // Store에서 account Store가져오기
    const { account, todo, follow, point } = this.props.Store;
    const { selectUser, loginAccount, selectUserTodos } = this.props;
    const { gallery_filePath, getAccount } = account;

    const openAt = selectUser.openAt;
    const today = todo.getToday;
    // 해야 할 일 개수 count
    const count = selectUserTodos.filter((item) => item.endTime >= today)
      .length;
    const isFollowed = follow.getIsFollowed;
    const isFollowing = follow.getIsFollowing;
    const followers = follow.getMyFollowers;
    const followings = follow.getMyFollowings;
    const isFollowingPage = follow.getIsFollowingPage;
    // const myTotalPoint = point.getMyTotal;
    const myTotalPoint = point.getMyRanking.total;
    const myLevel = point.getMyLevel;

    // console.log("토탈", myTotalPoint);
    return (
      <div>
        <ProfileManageView
          selectUser={selectUser}
          loginAccount={loginAccount}
          onModifyUser={this.onModifyUser}
          onDeleteUser={this.onDeleteUser}
          onSignout={this.onSignout}
          onSetAccountProp={this.onSetAccountProp}
          loginCheck={account.getLogCheck}
          todo_count={count}
          selectUserTodos={selectUserTodos}
          onFollow={this.onFollow}
          isFollowed={isFollowed}
          isFollowing={isFollowing}
          followers={followers}
          followings={followings}
          openAt={openAt}
          isFollowingPage={isFollowingPage}
          gallery_filePath={gallery_filePath}
          myTotalPoint={myTotalPoint}
          myLevel={myLevel}
          account={getAccount}
          onDeleteMyFollowing={this.onDeleteMyFollowing}
        />
      </div>
    );
  }
}

export default ProfileMangeContainer;
