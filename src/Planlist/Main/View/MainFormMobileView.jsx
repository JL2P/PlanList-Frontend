import React, { useState } from "react";
import { Container, Header } from "semantic-ui-react";
import MainCreateTodoFormView from "./MainCreateTodoFormView";
import TodoCreateModalView from "../../todo/view/TodoCreateModalView";

const MainFormMobileView = ({ Media, onSaveTodo }) => {
  // todo 모달
  const [todoCreateOpen, setTodoCreateOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  const onCreateTodoModal = (trigger) => {
    // todo 모달 열기
    setTodoCreateOpen(trigger);
  };
  const onEnterCreateTodoModal = (e) => {
    if (e.key === "Enter") {
      // todo 모달 열기
      setTodoCreateOpen(true);
    }
  };

  //메인화면에서 title바꾼거 state에 저장하기
  const onChangeTitle = (e) => setTodoTitle(e.target.value);

  return (
    <div style={{ background: "#1b1c1d" }}>
      <TodoCreateModalView
        open={todoCreateOpen}
        onModal={onCreateTodoModal}
        mainTodoTitle={todoTitle}
        onChangeMainTodoTitle={onChangeTitle}
        onSaveTodo={onSaveTodo}
      />
      <Media at="mobile">
        <Container
          text
          textAlign="center"
          style={{ paddingTop: "1em", paddingBottom: "3em" }}
        >
          <Header
            as="h1"
            content="Put your plan into action."
            style={{
              fontSize: "1.5em",
              fontWeight: "normal",
              color: "white",
            }}
          />

          <MainCreateTodoFormView
            mainTodoTitle={todoTitle}
            onChangeMainTodoTitle={onChangeTitle}
            onCreateTodoModal={onCreateTodoModal}
            onEnterCreateTodoModal={onEnterCreateTodoModal}
          />
        </Container>
      </Media>
    </div>
  );
};

export default MainFormMobileView;
