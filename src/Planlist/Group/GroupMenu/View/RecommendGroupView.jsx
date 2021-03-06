import React from "react";
import RecommendGroupItem from "./GroupItem/RecommendGroupItem";
import { Container, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../GroupStyle/Group.scss";

const RecommendGroupView = ({
  groups,
  onGroupDetail_page,
  onCategoryDefault,
  categoryList,
}) => {
  // useEffect(() => {
  //     onAllGroups();
  //   },[]);

  //그룹 내림차순
  const descending = groups.sort(function (a, b) {
    return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
  });

  const Groupitem = descending.map((item, index) => {
    if (index < 12) {
      return (
        <RecommendGroupItem
          onGroupDetail_page={onGroupDetail_page}
          key={index}
          item={item}
        />
      );
    }
  });

  return (
    <div className="bestGroup_wrap">
      <Container className="group_container_border">
        <div className="group_header_text">
          <p className="group_header_headerText">추천 더 보기</p>
          <p className="group_header_contents">
            다른 사람들과 같이 계획에 참여해 보세요!
          </p>
          <Link
            to="/groupcategory/"
            className="group_allView"
            onClick={() => onCategoryDefault(categoryList[0])}
          >
            모두 보기
          </Link>
        </div>
        <Grid columns={4} divided>
          <Grid.Row>{Groupitem}</Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default RecommendGroupView;
