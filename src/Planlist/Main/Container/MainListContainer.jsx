import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import MainListView from "../View/MainListView";
import MainItemGroupView from "../View/MainItem/MainItemGroupView";
import MainItemFrame from "../View/MainItem/MainItemFrame";

@inject("Store")
@observer
class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    //메인화면 조회되는 컬럼 수
    this.COLUMN_COUNT = 3;
    //각 Columne의 높이값을 비교하기위한 ref

    this.columns = [...Array(this.COLUMN_COUNT).keys()].map((_) =>
      React.createRef()
    );
  }

  //Todo를 업데이트 하는 함수
  onUpdateTodo = (e, todoUpdateModel) => {
    console.log(todoUpdateModel);
  };

  onCreateComment = (e, id) => {
    console.log(id);
    console.log(e.target.value);
  };

  componentDidMount() {
    this.props.Store.todo.getApiTodo(this.COLUMN_COUNT);
  }

  componentDidUpdate() {
    const { todo } = this.props.Store;

    const columnHeights = this.columns.map((item) => item.current.clientHeight);

    const MaxValue = Math.max.apply(null, columnHeights);
    const MinValue = Math.min.apply(null, columnHeights);

    const maxIndex = columnHeights.indexOf(MaxValue);
    const minIndex = columnHeights.indexOf(MinValue);

    //각 div를 비교했을때, 최대높이와 최소높이의 차이가 150이상일 경우

    if (MaxValue - MinValue > 300) {
      let changeTodoList = todo.getMainTodos;
      //최대높이의 item을 최소 높이의 아이템 배열에 넣어준다.
      changeTodoList[minIndex].push(changeTodoList[maxIndex].pop());

      //MainTodos변경
      todo.setMainTodos(changeTodoList);
    }
  }

  divisonToItemGroup = (data, n) => {
    const MainItemGroupList = [];

    //데이터를 이용하여 메인 아이템 리스트 생성
    const MainItemViewList = data.map((column) =>
      column.map((todoModel, idx) => (
        <MainItemFrame
          key={idx}
          todoModel={todoModel}
          onUpdateTodo={this.onUpdateTodo}
        />
      ))
    );

    //각 column을 itemGroup으로 만들어주기
    for (let i = 0; i < n; i++)
      MainItemGroupList.push(
        <MainItemGroupView
          key={i}
          items={MainItemViewList[i]}
          columnRef={this.columns[i]}
        />
      );

    return MainItemGroupList;
  };

  render() {
    //테스트용 데이터셋
    const { todo } = this.props.Store;
    const sampleData = todo.getMainTodos;

    //메인 아이템 리스트를 각 화면 커럼에 순서대로 배치
    const MainItemGroupListView = this.divisonToItemGroup(
      sampleData,
      this.COLUMN_COUNT
    );

    return <MainListView itemList={MainItemGroupListView} />;
  }
}

export default MainPageContainer;
