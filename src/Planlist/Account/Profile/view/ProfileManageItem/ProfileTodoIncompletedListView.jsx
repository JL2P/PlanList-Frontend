import React from "react";
import { Card, Divider } from "semantic-ui-react";
import ProfileTodoCardView from "./ProfileTodoCardView";
const ProfileTodoIncompletedListView = ({
  incompleted_list,
  incompleted_date,
  selectedTodo,
  onLikeButton,
  today,
  selectId,
  loginId,
  onComplete,
  onIncomplete,
  onAddPoint,
  onDeletePoint,
}) => {
  console.log("로그", selectId, loginId);
  return (
    <div>
      {incompleted_list.map((date, index) => (
        <div key={index}>
          <p>
            {incompleted_date[index].substring(0, 4) +
              "년 " +
              incompleted_date[index].substring(5, 7) +
              "월 " +
              incompleted_date[index].substring(8, 10) +
              "일까지 하지 못한 일"}
          </p>
          <Card.Group>
            {date.map((item, index) => (
              <ProfileTodoCardView
                todo={item}
                key={index}
                selectedTodo={selectedTodo}
                onLikeButton={onLikeButton}
                today={today}
                selectId={selectId}
                loginId={loginId}
                onComplete={onComplete}
                onIncomplete={onIncomplete}
                onAddPoint={onAddPoint}
                onDeletePoint={onDeletePoint} 
              />
            ))}
          </Card.Group>
          <Divider style={{ marginTop: "30px" }} />
        </div>
      ))}
    </div>
  );
};

export default ProfileTodoIncompletedListView;
