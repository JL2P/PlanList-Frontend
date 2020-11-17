export default class GroupModifyModel{
    constructor(groupObj){
        this.id = groupObj.id;
        this.title = groupObj.title //제목
        this.description = groupObj.description //설명글
        this.openAt = groupObj.openAt; //그룹 공개 여부
    }
}
