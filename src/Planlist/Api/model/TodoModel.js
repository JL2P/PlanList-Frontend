
const dateParse= (date=null)=> {
    let d = date?new Date(date): new Date();
    let year = d.getFullYear();
    let month = (1 + d.getMonth());
    month = month >= 10 ? month : '0' + month;
    let day = d.getDate();
    day = day >= 10 ? day : '0' + day;
    return year + '-' + month + '-' + day;
}

export default class TodoModel{
    constructor(todoObj){
        this.title=todoObj.title;
        this.description=todoObj.description;
        this.category=todoObj.category;
        this.startTime=dateParse();
        this.endTime=todoObj.endTime;
        this.completed=todoObj.completed||"N";
    }
}