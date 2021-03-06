import AccountModel from '../AccountModel';
import { CommentModel } from "../comment/CommentModels";

export default class TodoModel {
  constructor(todoObj) {
    this.todoId = todoObj.todoId;
    this.imgUrl = todoObj.imgUrl;
    this.title = todoObj.title;
    this.description = todoObj.description;
    this.category = todoObj.category;
    this.writer = todoObj.writer;
    this.endTime = todoObj.endTime;
    this.startTime = todoObj.startTime;
    this.groupAt = todoObj.groupAt;
    this.likePoint = todoObj.likePoint;
    this.likeState = todoObj.likeState;
    this.completed = todoObj.completed;
    this.comments = todoObj.comments.map(
      (comment) => new CommentModel(comment)
    );
    this.created = todoObj.created;
    this.modified = todoObj.modified;
    this.accountModel = todoObj.accountModel !== undefined ? new AccountModel(todoObj.accountModel):{}
    this.galleries = todoObj.galleries.map(gallery=>new GalleryModel(gallery));
  }
}


class GalleryModel{
  constructor(galleryObj){
    this.galleryId = galleryObj.id;
    this.title = galleryObj.title;
    this.filePath = galleryObj.filePath;
    this.todoId = galleryObj.todoId;
  }
}