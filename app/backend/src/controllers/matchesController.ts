import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  public getMatches = async (req: Request, res: Response) => {
    const matchesService = new MatchesService();
    const showMatches = await matchesService.getMatches();

    res.status(200).json(showMatches);
  };

  /* public findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamsService = new TeamsService();
    const showTeam = await teamsService.findById(Number(id));

    res.status(200).json(showTeam);
  }; */
}

export default MatchesController;
