import ILeaderResults from '../interfaces/ILeaderResults';

function newFunction(teamHome: ILeaderResults): (value: ILeaderResults) => unknown {
  return (awayData: ILeaderResults) => teamHome.name === awayData.name;
}

const returnBoardAll = async (home: ILeaderResults[], away: ILeaderResults[]) => {
  const result = home.map((teamHome: ILeaderResults) => {
    const teamAway = away.find(newFunction(teamHome)) as ILeaderResults;

    const totalPoints = teamHome.totalPoints + teamAway.totalPoints;
    const totalGames = teamHome.totalGames + teamAway.totalGames;

    return {
      name: teamHome.name,
      totalPoints,
      totalGames,
      totalVictories: teamHome.totalVictories + teamAway.totalVictories,
      totalDraws: teamHome.totalDraws + teamAway.totalDraws,
      totalLosses: teamHome.totalLosses + teamAway.totalLosses,
      goalsFavor: teamHome.goalsFavor + teamAway.goalsFavor,
      goalsOwn: teamHome.goalsOwn + teamAway.goalsOwn,
      goalsBalance: teamHome.goalsBalance + teamAway.goalsBalance,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  });

  return result;
};

export default returnBoardAll;
