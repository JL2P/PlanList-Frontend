import {observable, computed, action } from "mobx";
import GroupPointRepository from "../../Api/Repository/GroupPointRepository";
import GroupPointAddModel from "../../Api/model/groupPoint/GroupPointAddModel";
import GroupPointModel from "../../Api/model/groupPoint/GroupPointModel";
import GroupRankModel from "../../Api/model/groupPoint/GroupRankModel";
import InGroupRankModel from "../../Api/model/groupPoint/InGroupRankModel";

export default class GroupPointStore {
    constructor(root) {
        this.root = root;
        this.GroupPointRepository = new GroupPointRepository();

    }

    //그룹의 모든 점수 리스트
    @observable groupPoints = [];

    @observable groupTodayPoint = 0;
    @observable groupTotalPoint = 0;

    //그룹의
    @observable groupRanks = [];
    @observable inGroupRanks = [];


    @computed getGroupPoints() {
        return this.groupPoints;
    }

    @computed getGroupTodayPoints() {
        return this.groupTodayPoint;
    }

    //완료하면 그룹 점수 추가
    @action 
    async addGroupPoint(groupPointObj) {
        const groupPointAddModel = new GroupPointAddModel(groupPointObj);
        await this.groupPointRepository.createGroupPoint(groupPointAddModel);
    }

    //완료 취소하면 그룹 점수 회수(해당 유저 점수도 같이 회수)
    @action
    async deleteGroupPoint (accountId, groupId, todoId) {
        await this.groupPointRepository.deleteGroupPoint(accountId, groupId, todoId);
    }

    //특정 그룹의 전체 점수를 전체 조회
    @action
    async getGroupAllPoints (groupId) {
        const groupAllPoints = await this.groupPointRepository.getGroupAllPoint(groupId);
        this.groupPoints = groupAllPoints.map((item) =>  new GroupPointModel(item));
    }

    //모든 그룹 랭킹 전체 조회
    @action
    async getGroupsAllRankings () {
        const groupsAllRankings = await this.groupPointRepository.getGroupsAllRankings();
        this.groupRanks = groupsAllRankings.map((item) => new GroupRankModel(item));
    }

    //특정 그룹 내 랭킹 전체 조회
    @action
    async getInGroupAllRankings (groupId) {
        await this.groupPointRepository.getInGroupAllRankings(groupId);
    }

}

