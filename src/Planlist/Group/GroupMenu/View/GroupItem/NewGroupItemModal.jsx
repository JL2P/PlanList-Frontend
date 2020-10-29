import React,{useState} from "react";
import { Button, Header, TextArea ,Input, Icon, Form, Grid, Select, Container, Divider } from "semantic-ui-react";
import FileUploadFormView from "../../../../todo/view/FileUploadFormView";

const NewGroupItemModal = ({ setOpen,categoryList,onCreateGroup }) => {

  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  //그리드 사이즈 지정
  const GRID_LEFT = 4;
  const GRID_RIGHT = 16 - GRID_LEFT;
  const maxNumber = 69;

  const onChangeImages = (imageList) => setImages(imageList);
  const onChangeCategory = (e,{value}) => {setCategory(value); console.log(category)}
  const onChangeTitle = (e) => {setTitle(e.target.value)};
  const onChangeDescription = (e) => setDescription(e.target.value);

  return (
    <Container>
      <div style={{ margin: "3rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Header as="h2" content="그룹 생성" />
            <Icon name="cancel" size="big" onClick={() => setOpen(false)} style={{cursor:"pointer",marginBottom: "0.5em"}} />
          </div>
          <Divider style={{ marginTop: "-0.5em", marginBottom: "1.5em" }} />

          <Form>
            <Grid stackable>
              <Grid.Row columns={2}>
                <Grid.Column width={GRID_LEFT}>
                  <aside>
                    <label>카테고리</label>
                  </aside>
                </Grid.Column>
                <Grid.Column width={GRID_RIGHT}>
                  <Form.Field
                    value={category}
                    control={Select}
                    onChange={onChangeCategory}
                    placeholder="카테고리"
                    options={categoryList}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} style={{ marginTop: "-1em" }}>
                <Grid.Column width={GRID_LEFT}>
                  <aside>
                    <label>그룹 이름</label>
                  </aside>
                </Grid.Column>
                <Grid.Column width={GRID_RIGHT}>
                  <Form.Field
                    value={title}
                    control={Input}
                    onChange={onChangeTitle}
                    placeholder="계획을 한마디로 표현해보세요."
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2} style={{ marginTop: "-1em" }}>
                <Grid.Column width={GRID_LEFT}>
                  <aside>
                    <label>그룹 소개</label>
                  </aside>
                </Grid.Column>
                <Grid.Column width={GRID_RIGHT}>
                  <Form.Field
                    control={TextArea}
                    value={description}
                    onChange={onChangeDescription}
                    placeholder="오늘은 어떤 계획을 생각하고 계십니까?"
                    style={{ minHeight: 100 }}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            {/* 이미지 업로드 부분 */}
            <div style={{ marginTop: "1em" }}>
              <FileUploadFormView
                images={images}
                onChangeImages={onChangeImages}
                maxNumber={maxNumber}
                message={"클릭 또는 드래그하여 이미지를 업로드 해주세요"}
              />
            </div>

            <Button
              fluid
              style={{
                marginTop: "1em",
                background: "#FFB517",
                color: "#ffffff",
              }}
              onClick={(e) => {
                onCreateGroup(e, {
                  category: category,
                  title: title,
                  description: description,
                });
              }}
            >
              저장
            </Button>
          </Form>
      </div>
    </Container>
  );
};

export default NewGroupItemModal;
