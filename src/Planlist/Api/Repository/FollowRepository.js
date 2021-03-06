import axios from "axios"
import {axios_auth_POST, axios_auth_GET, axios_auth_PUT, axios_auth_DELETE} from "../common/CommonAxiosModules"


//Account관련 Api와 연동하는 클래스
export default class FollowRepository{
    //공통 적으로 사용되는 URL
    URL = "/api/accounts/follow/";

     // 아직 confirm 받지 않은 나의 모든 팔로워 조회
   // GET /api/accounts/
    notConfirmFollowersFunction = () => {
    return axios_auth_GET(this.URL,[]);
}

    //@PostMapping("/follow")
    followFunction = (AccountId, FollowId) => {
        const data={
            "myAccountId" : AccountId,
            "followAccountId" : FollowId
        }
        // url
        // data
        // format 
        return axios_auth_POST(this.URL,data,{});
    }

    //@GetMapping("/myFollowerList")
    getMyFollowersFunction = () => {

        return axios_auth_GET(this.URL+"myFollowerList",[]);
    }
    //@GetMapping("/")

    //@GetMapping("/followinglist")
    getFollowinglistFunction = (AccountId) => {
        const data={
            "myAccountd" : AccountId
        }
        return axios.get(this.URL+"followinglist", data).then(request=>request.data||{});
    }

    //승훈 추가
    //내가 팔로우를 신청한 사람들중에 나를 수락한 사람들의 데이터를 가져온다.
    //TodoStore에서 사용중
    getMyFollowinglistFunction = ()=>{
        return axios_auth_GET(this.URL+'myFollowingList',[]);
    }
    //
    
    //@PostMapping("/isfollow")
    followCheckFunction = (FollowId) => {
       return axios_auth_POST(this.URL+`isfollow/${FollowId}`,{},{});
    }

    //@PostMapping("isfollowing")
    followingCheckFunction = (FollowId) => {
        return axios_auth_POST(this.URL+`isfollowing/${FollowId}`,{},{});
    }

    //@PostMapping("/isfollowingPage/{followId}")
    followingPageCheckFunction = (FollowId) => {
        return axios_auth_POST(this.URL+`isfollowingPage/${FollowId}`,{},{});
    }

    //@PostMapping("isfollower")
    followerCheckFunction = (FollowId) => {
        return axios_auth_POST(this.URL+`isfollower/${FollowId}`, {},{});
    }

    //@PutMapping("/confirm/{followId}")
    followConfirmFunction = (FollowId) => {
        return axios_auth_PUT(this.URL+`confirm/${FollowId}`,{},{});
    }

    //@DeleteMapping("/refuse/{followId}")
    followRefuseFunction = (FollowId) => {
        return axios_auth_DELETE(this.URL+`refuse/${FollowId}`,{},{});
    }

    //@DeleteMapping("/delete/{followId}")
    deleteMyFollowingFunction = (FollowId) => {
        return axios_auth_DELETE(this.URL+`delete/${FollowId}`,{},{});
    }

    //@GetMapping("{accountId}/followers")
    getFollowersFunction = (AccountId) => {
        return axios_auth_GET(this.URL+`${AccountId}/followers`,[]);
    }

    //@GetMapping("{accountId}/followings")
    getFollowingsFunction = (AccountId)=>{
        return axios_auth_GET(this.URL+`${AccountId}/followings`,[]);
    }
}