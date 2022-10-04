import { IAwayTeamMatch } from '../interfaces/IHomeTeamMatch';
import { IAwayMatch } from '../interfaces/IHomeMatch';
import ILeaderResults from '../interfaces/ILeaderResults';

const getGoals = (matches: IAwayTeamMatch[]) => {
  const goalsFavor = matches.reduce((acc: number, curr: IAwayTeamMatch) =>
    acc + curr.awayTeamGoals, 0);

  const goalsOwn = matches.reduce((acc: number, curr: IAwayTeamMatch) =>
    acc + curr.homeTeamGoals, 0);

  const goalsBalance = goalsFavor - goalsOwn;

  return { goalsFavor, goalsOwn, goalsBalance };
};

const getMatchResults = (matches: IAwayTeamMatch[]) => {
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let totalPoints = 0;

  matches.forEach((match: IAwayTeamMatch) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      totalVictories += 1; totalPoints += 3;
    } else if (match.awayTeamGoals === match.homeTeamGoals) {
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

const sortBoardAway = (board: ILeaderResults[]) => {
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

const returnBoardAway = (allMatches: IAwayMatch[]) => {
  const matches = Promise.all(allMatches.map(async (match) => {
    const name = match.teamName;
    const totalGames = match.awayTeamMatches.length;
    const goals = getGoals(match.awayTeamMatches);
    const total = getMatchResults(match.awayTeamMatches);
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

export { getMatchResults, returnBoardAway, sortBoardAway };
