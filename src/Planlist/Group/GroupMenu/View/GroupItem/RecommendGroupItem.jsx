import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../../GroupStyle/Group.scss";

const RecommendGroupItem = ({ item,onGroupDetail_page }) => {
  return (
    <Grid.Column className="recommendGroup_column" onClick={() => onGroupDetail_page(item.id)}>
        <Link to={`/groupdetail/${item.id}/`}>
        <Card className="group_card" raised>
          <Image src={
            item.galleries[0] ? item.galleries[0].filePath : item.imgUrl
            } className="Group_img" />
            <Card.Content>
            <Card.Header className="group_Card_header">{item.title}</Card.Header>
            <Card.Description>member :{item.members.length}명 </Card.Description>
            </Card.Content>
        </Card>
        </Link>
    </Grid.Column>
  );
};

export default RecommendGroupItem;
