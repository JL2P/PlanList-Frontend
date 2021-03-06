import axios from "axios";

import {axios_auth_GET,axios_auth_POST } from "../common/CommonAxiosModules"

const HEADER = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
  },
};

export default class AccountRepository {
  //공통 적으로 사용되는 URL
  URL = "/api/accounts";

  accountInfo = ()=>{
      return axios_auth_GET(this.URL+"/info",{}).then(data=>{ 
        console.log(data.message)
        if(data.message === "account not found") window.location.href="http://ec2-3-35-119-242.ap-northeast-2.compute.amazonaws.com/signin";  
        return data;
      });
  }

  // account list조회
  // GET /api/accounts/
  accountList = () => {
    return axios.get(this.URL, HEADER).then((request) => request.data || []);
  };

  //account 조회
  // GET /api/account/{accountId}/
  accountDetail = (accountId) => {
    return axios
      .get(this.URL + `/${accountId}`, HEADER)
      .then((request) => request.data || {});
  };

  // account 수정
  // PUT /api/account/
  accountModify = (AccountModel) => {
    return axios
      .put(this.URL + "/edit", AccountModel, HEADER)
      .then((request) => request.data || {});
  };

  // account 삭제
  // DELETE /api/account/{accountId}/
  accountDelete = (accountId) => {
    return axios
      .delete(this.URL + `/signout/${accountId}`,HEADER)
      .then((request) => request.data || null);
  };

  //auth
  // POST /api/account/
  accountAuth = (AccountModel) => {
    return axios
      .post(this.URL + "/auth", AccountModel)
      .then((request) => request.data || {});
  };


  todosAccountMapping = (todoModels)=>{
    const todoAccountDtos = todoModels;
    const url = this.URL +"/todos/mapping" 
    return axios_auth_POST(url, todoAccountDtos,[])
  }

  groupTodosAccountMapping = (groupTodoModels)=>{
    const groupTodoAccountDtos = groupTodoModels;
    const url = this.URL +"/grouptodos/mapping" 
    return axios_auth_POST(url, groupTodoAccountDtos,[])
  }
}
