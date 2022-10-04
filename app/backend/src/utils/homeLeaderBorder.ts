import IHomeTeamMatch from '../interfaces/IHomeTeamMatch';
import IHomeMatch from '../interfaces/IHomeMatch';
import ILeaderResults from '../interfaces/ILeaderResults';

const getGoals = (matches: IHomeTeamMatch[]) => {
  const goalsFavor = matches.reduce((acc: number, curr: IHomeTeamMatch) =>
    acc + curr.homeTeamGoals, 0);

  const goalsOwn = matches.reduce((acc: number, curr: IHomeTeamMatch) =>
    acc + curr.awayTeamGoals, 0);

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const getMatchResults = (matches: IHomeTeamMatch[]) => {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let totalPoints = 0;

  matches.forEach((match: IHomeTeamMatch) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalVictories += 1; totalPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      totalDraws += 1; totalPoints += 1;
    } else {
      totalLosses += 1;
    }
  });
  return { totalPoints, totalVictories, totalDraws, totalLosses };
};

const getEfficiency = async (P: number, J: number) => {
  const efficiency = (P / (J * 3)) * 100;
  return efficiency;
};

const sortBoard = (board: ILeaderResults[]) => {
  const sortedLeaderboard = board.sort((a: ILeaderResults, b: ILeaderResults) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  });
  return sortedLeaderboard;
};

const returnBoard = (allMatches: IHomeMatch[]) => {
  const matches = Promise.all(allMatches.map(async (match) => {
    const name = match.teamName;
    const totalGames = match.homeTeamMatches.length;
    const goals = getGoals(match.homeTeamMatches);
    const total = getMatchResults(match.homeTeamMatches);
    const efficiency = await (await (getEfficiency(total.totalPoints, totalGames))).toFixed(2);

    return {
      name,
      totalPoints: total.totalPoints,
      totalGames,
      totalVictories: total.totalVictories,
      totalDraws: total.totalDraws,
      totalLosses: total.totalLosses,
      ...goals,
      efficiency,
    };
  }));
  return matches;
};

export { getMatchResults, returnBoard, sortBoard };
