import MatchesModel from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

class BoardService {
  public getLeaderBoard = async () => {
    const showBoard = await MatchesModel.findAll({
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

    return showBoard;
  };
}

export default BoardService;
