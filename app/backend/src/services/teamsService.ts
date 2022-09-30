import TeamModel from '../database/models/TeamModel';

class TeamsService {
  public getTeams = async () => {
    const showTeams = await TeamModel.findAll();

    return showTeams;
  };

  public findById = async (id: number) => {
    const showTeam = await TeamModel.findByPk(id);

    return showTeam;
  };
}

export default TeamsService;
