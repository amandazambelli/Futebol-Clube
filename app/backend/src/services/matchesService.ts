import MatchesModel from '../database/models/MatchesModel';
import Team from '../database/models/TeamModel';

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

  /* public findById = async (id: number) => {
    const showTeam = await TeamModel.findByPk(id);

    return showTeam;
  }; */
}

export default MatchesService;
