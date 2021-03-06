import React from "react";
import { Checkbox, Form, Grid } from "semantic-ui-react";
import "./ProfileModify.scss";

const ProfileAccountPrivacyView = ({ account, check, onChecked }) => {
  const getCheckState = () => {
    //Account에 체크정보가 존재할 경우
    if (check === null) {
      return account.openAt === "Y" ? true : false;
    }
    return check;
  };

  const checkValue = getCheckState();
  return (
    <Form style={{ width: "95%" }}>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <h3>계정 공개 범위 설정</h3>
            <p>
              계정이 비공개 상태인 경우 회원님이 승인한 사람만 회원님의 계획을
              볼 수 있습니다.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Checkbox
              label="계정 공개하기"
              // checked={!check}
              checked={checkValue}
              onChange={onChecked}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default ProfileAccountPrivacyView;
