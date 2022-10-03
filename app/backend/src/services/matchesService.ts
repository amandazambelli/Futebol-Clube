import MatchesModel from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';
import ISaveMatch from '../interfaces/iSaveMatch';
import IGoals from '../interfaces/IGoals';

class MatchesService {
  public getMatches = async () => {
    const showMatches = await MatchesModel.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        }, {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return showMatches;
  };

  public saveMatch = async (matchInfo: ISaveMatch) => {
    const findIdHomeTeam = await Team.findByPk(matchInfo.homeTeam);
    const findIdAwayTeam = await Team.findByPk(matchInfo.awayTeam);

    if (!findIdAwayTeam || !findIdHomeTeam) {
      return undefined;
    }

    const matchData = await MatchesModel.create(matchInfo);

    const result = {
      id: matchData.id,
      homeTeam: matchData.homeTeam,
      homeTeamGoals: matchData.homeTeamGoals,
      awayTeam: matchData.awayTeam,
      awayTeamGoals: matchData.awayTeamGoals,
      inProgress: matchData.inProgress,
    };

    return result;
  };

  public finish = async (id: number, inProgress: boolean) => {
    const updateMatch = await MatchesModel.update({ inProgress }, { where: { id } });

    return updateMatch;
  };

  public changeResults = async (id: number, goals: IGoals) => {
    const { homeTeamGoals, awayTeamGoals } = goals;
    const updateGoals = await MatchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return updateGoals;
  };
}

export default MatchesService;
