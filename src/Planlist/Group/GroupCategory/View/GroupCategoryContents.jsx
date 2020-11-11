import React, {useEffect} from 'react';
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../GroupStyle/Group.scss";

const GroupCategoryContents = ({groups,
        selectList, 
        onAllGroups,
        location,
        onGroupDetail_page
    }) => {
    //추후 전체보기 구현에 사용
    useEffect(() => {
        onAllGroups();
      },[]);

    const GroupCategoryitem = groups.map((item, index) => (

        <div key={index}>
            {`/groupcategory/` == location.pathname ? ( 
                //전체 조회
                <Grid.Column  className="recommendGroup_column" onClick={() => onGroupDetail_page(item.id)}>
                    <Link to={`/groupdetail/${item.id}/`}>
                        <Card className="group_card" raised>
                        <Image src={item.imgUrl} className="Group_img" />
                        <Card.Content>
                            <Card.Header className="group_Card_header">
                            {item.title}
                            </Card.Header>
                            <Card.Description>member : {item.rating}</Card.Description>
                        </Card.Content>
                        </Card>
                    </Link>
                </Grid.Column>

            ) : `/groupcategory/${item.category}` == location.pathname ? (
                // 카테고리별로 조회
                <Grid.Column  className="recommendGroup_column" onClick={() => onGroupDetail_page(item.id)}>
                    <Link  to={`/groupdetail/${item.id}/`}>
                        <Card className="group_card" raised>
                        <Image src={item.imgUrl} className="Group_img" />
                        <Card.Content>
                            <Card.Header className="group_Card_header">
                            {item.title}
                            </Card.Header>
                            <Card.Description>member : {item.rating}</Card.Description>
                        </Card.Content>
                        </Card>
                    </Link>
                </Grid.Column>
            ) : ""
            
            }
        </div>
    ));

    return (
        <div>
            <h2 style={{marginBottom:"2rem"}}>{selectList.text}</h2>
            <Grid columns={4} divided>
                <Grid.Row>
                    {GroupCategoryitem}
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default GroupCategoryContents;