import React, { useState } from "react";
import { Container, Modal, Menu, Grid, Button, Icon } from "semantic-ui-react";
import ProfileAccountModifyView from "../ProfileModifyItem/ProfileAccountModifyView";
import ProfileAccountPrivacyView from "../ProfileModifyItem/ProfileAccountPrivacyView";
import SignoutModalView from "./SignoutModalView";
import WithdrawalModalView from "./WithdrawalModalView";

const ProfileSettingModalView = ({
  settingOpen,
  onSettingModal,
  activeItem,
  handleItemClick,
  account,
  onSignout,
  onModifyUser,
  onSetAccountProp,
  onDeleteUser,
  gallery_filePath,
  detailAccount,
}) => {
  const modal_height = "400px"; // 모달창 높이

  //회원 정보
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [introduce, setIntroduce] = useState("");
  // account 공개 여부를 체크하기 위함
  const [check, setChecked] = useState(null);

  const onChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onChangeName = (e) => setName(e.target.value);
  const onChangeBirth = (e) => setBirth(e.target.value);
  const onChangeGender = (e, { value }) => setGender(value);
  const onChangeIntroduce = (e) => setIntroduce(e.target.value);

  const onChecked = () => {
    if (check === null) {
      setChecked(account.openAt === "Y" ? false : true);
    } else {
      setChecked(!check);
    }

    // if (account.openAt === "Y") {
    //   setChecked(false);
    // } else {
    //   setChecked(true);
    // }
  };

  // 회원 탈퇴 모달
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const onWithdrawalModal = (trigger) => {
    setWithdrawalOpen(trigger);
  };

  // 로그아웃 모달
  const [signoutOpen, setSignoutOpen] = useState(false);
  const onSignoutModal = (trigger) => {
    setSignoutOpen(trigger);
  };

  return (
    <Modal
      onClose={() => onSettingModal(false)}
      onOpen={() => onSettingModal(true)}
      open={settingOpen}
      style={{ width: "700px" }}
    >
      {/* 회원탈퇴 모달 */}
      <WithdrawalModalView
        withdrawalOpen={withdrawalOpen}
        onWithdrawalModal={onWithdrawalModal}
        onDeleteUser={onDeleteUser}
        account={account}
      />

      {/* 로그아웃 모달 */}
      <SignoutModalView
        signoutOpen={signoutOpen}
        onSignoutModal={onSignoutModal}
        onSignout={onSignout}
        account={account}
      />

      <Modal.Header>
        <Container textAlign="center">설정</Container>
      </Modal.Header>

      <Grid style={{ marginTop: "15px" }}>
        <Grid.Column width={3}>
          <Modal.Content style={{ height: modal_height }}>
            <Menu
              vertical
              tabular
              pointing
              secondary
              style={{ height: modal_height, width: "120px" }}
            >
              <Menu.Item
                name="내정보 관리"
                active={activeItem === "내정보 관리"}
                onClick={() => handleItemClick("내정보 관리")}
              />

              {/* <Menu.Item
                name="비밀번호 변경"
                active={activeItem === "비밀번호 변경"}
                onClick={() => handleItemClick("비밀번호 변경")}
              /> */}

              <Menu.Item
                name="공개 범위"
                active={activeItem === "공개 범위 설정"}
                onClick={() => handleItemClick("공개 범위 설정")}
              />

              <Menu.Item
                // href="/account"
                name="로그아웃"
                active={activeItem === "로그아웃"}
                onClick={() => {
                  // onSettingModal(false);
                  // onSignout();
                  onSignoutModal(true);
                }}
              />

              <Menu.Item
                // href="/"
                name="회원탈퇴"
                active={activeItem === "회원탈퇴"}
                onClick={() => {
                  onWithdrawalModal(true);
                }}
              />
            </Menu>
          </Modal.Content>
        </Grid.Column>

        <Grid.Column stretched width={13} margin-right={2}>
          <Modal.Content
            scrolling
            image
            style={{ width: "100%", height: modal_height }}
          >
            <div>
              {activeItem === "내정보 관리" && (
                <ProfileAccountModifyView
                  account={account}
                  onSetAccountProp={onSetAccountProp}
                  gallery_filePath={gallery_filePath}
                  detailAccount={detailAccount}
                  onChangeImage={onChangeImage}
                  onChangeName={onChangeName}
                  onChangeBirth={onChangeBirth}
                  onChangeGender={onChangeGender}
                  onChangeIntroduce={onChangeIntroduce}
                  imgUrl={imgUrl}
                  name={name}
                  birth={birth}
                  gender={gender}
                  introduce={introduce}
                />
              )}
              {/* {activeItem === "비밀번호 변경" && (
                <ProfilePasswordModifyView account={account} />
              )} */}
              {activeItem === "공개 범위 설정" && (
                <ProfileAccountPrivacyView
                  account={account}
                  onSetAccountProp={onSetAccountProp}
                  check={check}
                  onChecked={onChecked}
                />
              )}
              {activeItem === "로그아웃"}
              {activeItem === "회원탈퇴"}
            </div>
          </Modal.Content>
        </Grid.Column>
      </Grid>
      <Modal.Actions>
        <Button basic onClick={() => onSettingModal(false)}>
          <Icon name="remove" /> 취소
        </Button>
        <Button
          // href="/account"
          style={{ background: "#FFB517" }}
          onClick={() => {
            onModifyUser(
              {
                accountId: account.accountId,
                name: name ? name : account.name,
                birth: birth ? birth : account.birth,
                gender: gender ? gender : account.gender,
                introduce: introduce ? introduce : account.introduce,
                openAt: check !== null ? (check ? "Y" : "N") : account.openAt,
              },
              file
            );
            onSettingModal(false);
          }}
        >
          <Icon name="checkmark" /> 저장
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ProfileSettingModalView;
