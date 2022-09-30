import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  public getTeams = async (req: Request, res: Response) => {
    const teamsService = new TeamsService();
    const showTeams = await teamsService.getTeams();

    res.status(200).json(showTeams);
  };

  public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamsService = new TeamsService();
    const showTeam = await teamsService.findById(Number(id));

    res.status(200).json(showTeam);
  };
}

export default TeamsController;
