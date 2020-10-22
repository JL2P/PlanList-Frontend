import React, {useState} from 'react';
import DetailGroupAllList from './DetailGroupAllList'
import DetailGroupAllModal from './DetailGroupAllModal'
import { Segment ,Input,Button, Header, Icon, Modal, Grid  } from "semantic-ui-react";
import '../../../GroupStyle/GroupDetail.scss';

const GroupAllView = ({sampleData}) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("");

    const onSearch = (e) => {setSearch(e.target.value)}

    const Groupitem = sampleData.map((item, index) => (
        <DetailGroupAllList key={index} item={item} />
      ));
    return (
        <div>
            <Segment>
            <Input
                icon={{ name: 'search', circular: true, link: true }}
                placeholder='작성자, 게시물을 입력해주세요.'
                style={{width:"100%"}}
                value={search}
                onChange={onSearch}
            />
            </Segment>

            <Segment>
                <Modal
                    closeIcon
                    open={open}
                    trigger={
                        <div>
                            <Input
                                placeholder='새로운 계획을 시작해 보세요!'
                                style={{width:"100%"}}
                                className="detailGroup_create_input"
                                icon={{ name: 'write square', circular: true, link: true }}
                            />
                        </div>
                    }
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    >
                    <DetailGroupAllModal />
                </Modal>
            </Segment>

            <Segment>
                <Grid columns={2} divided style={{margin:"-0.5rem"}}>
                    <Grid.Row>
                        {Groupitem}
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};

export default GroupAllView;