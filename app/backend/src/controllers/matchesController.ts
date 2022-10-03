import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  public getMatches = async (req: Request, res: Response) => {
    const matchesService = new MatchesService();
    const showMatches = await matchesService.getMatches();

    /* const { inProgress } = req.query;

    if (inProgress === 'true' || inProgress === 'false') {
      const filteredResult = showMatches.filter(
        (match) => toString(match.inProgress) === inProgress);
      );
      res.status(200).json(filteredResult);
    } */

    res.status(200).json(showMatches);
  };

  public saveMatch = async (req: Request, res: Response) => {
    const matchesService = new MatchesService();
    const matchData = await matchesService.saveMatch(req.body);

    if (matchData === undefined) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    res.status(200).json(matchData);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { inProgress } = req.body;
    const matchesService = new MatchesService();
    await matchesService.finish(Number(id), inProgress);

    res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
