import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import GroupRankingListContainer from "./container/GroupRankingListContainer";
import RankingAllUserContainer from "./container/RankingAllUserContainer";
import RankingBadgeContainer from "./container/RankingBadgeContainer";
import RankingHeatmapContainer from "./container/RankingHeatmapContainer";
import GroupRankingListView from "./view/GroupRankingListView";

@inject("Store")
@observer
class RankingPage extends Component {
  componentDidMount() {
    const { groupPoint, point, account } = this.props.Store;

    groupPoint.testGroupAllRankings();

    account.getApiAccountInfo().then(() => {
      const loginId = account.getLoginAccount.accountId;
      point.myRanking(loginId);
      point.allPoints(loginId);
    });
  }

  render() {
    return (
      <div>
       
        <GroupRankingListView></GroupRankingListView>
        <RankingBadgeContainer />
        <RankingAllUserContainer />
        <RankingHeatmapContainer />
        <GroupRankingListContainer></GroupRankingListContainer>
      </div>
    );
  }
}

export default RankingPage;
