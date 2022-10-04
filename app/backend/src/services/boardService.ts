import MatchesModel from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

class BoardService {
  public getHomeLeaderBoard = async () => {
    const showBoard = await Team.findAll({
      include: [
        {
          model: MatchesModel,
          as: 'homeTeamMatches',
          where: { inProgress: 0 },
        },
      ],
    });

    return showBoard;
  };

  public countMatches = async () => {
    const showMatches = await MatchesModel.findAll({ where: { inProgress: false } });

    return showMatches;
  };
}

export default BoardService;
