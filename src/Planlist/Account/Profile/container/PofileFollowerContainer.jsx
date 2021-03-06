import React, { Component } from "react";
import ProfileFollowerView from "../view/ProfileManageFollower/ProfileFollowerView";
import { Button } from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import FollowingCancelModal from "../view/ProfileManageFollower/FollowingCancelModal";

@inject("Store")
@observer
class PofileFollowerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { follower } = this.props;
    const { follow, account } = this.props.Store;
    follow.followingCheck(follower.accountId);
    follow.followerCheck(follower.accountId);
    account.getApiAccountInfo();
  }

  onModal = (flag) => {
    this.setState({ open: flag });
  };

  onFollow = (followId) => {
    alert("팔로우 요청되었습니다.");
    const { follow } = this.props.Store;
    follow.follow(followId);
    window.location.reload();
  };

  onFollowRefuse = (followId) => {
    const { follow } = this.props.Store;
    follow.deleteMyFollowing(followId).then((res) => {
      alert("팔로우 취소되었습니다.");
      window.location.reload();
    });
    window.location.reload();
  };

  render() {
    console.log("render");
    const { follower, selectUser } = this.props;
    console.log("누구냐", follower);
    const { follow, account } = this.props.Store;
    const loginId = account.getLoginAccount.accountId;
    const myFollowings = follow.getMyFollowings;

    // const isFollower = follow.getIsFollower;
    // const isFollowing = follow.getIsFollowing;
    //follower True Following True
    // 팔로우 취소버튼

    const isFollower = myFollowings.filter(
      (following) => following.accountId === follower.accountId
    );

    console.log("myFollowings", myFollowings);
    console.log("isFollower", isFollower);

    const flag = isFollower.length > 0 ? true : false;

    //follower false Following True
    // 팔로우하기 버튼
    const btn =
      follower.accountId === loginId ? (
        ""
      ) : flag === true ? (
        <Button
          size="tiny"
          basic
          color="grey"
          onClick={() => {
            this.onModal(true);
          }}
        >
          팔로잉취소
        </Button>
      ) : (
        <Button
          size="tiny"
          basic
          color="grey"
          onClick={() => {
            this.onFollow(follower.accountId);
          }}
        >
          팔로잉
        </Button>
      );

    return (
      <ProfileFollowerView
        follower={follower}
        onFollowRefuse={this.onFollowRefuse}
        onBtn={btn}
        loginId={loginId}
        selectUser={selectUser}
      >
        <FollowingCancelModal
          following={follower}
          open={this.state.open}
          onModal={this.onModal}
          onFollowRefuse={this.onFollowRefuse}
        />
      </ProfileFollowerView>
    );
  }
}

export default PofileFollowerContainer;
