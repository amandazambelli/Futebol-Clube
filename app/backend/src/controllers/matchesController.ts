import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  public getMatches = async (req: Request, res: Response) => {
    const matchesService = new MatchesService();
    const showMatches = await matchesService.getMatches();

    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const filteredResult = showMatches.filter(
        (match) => match.inProgress,
      );
      return res.status(200).json(filteredResult);
    }
    if (inProgress === 'false') {
      const filteredResult = showMatches.filter(
        (match) => !match.inProgress,
      );
      return res.status(200).json(filteredResult);
    }

    return res.status(200).json(showMatches);
  };

  public saveMatch = async (req: Request, res: Response) => {
    const matchesService = new MatchesService();
    const matchData = await matchesService.saveMatch(req.body);

    if (matchData === undefined) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    res.status(201).json(matchData);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matchesService = new MatchesService();
    await matchesService.finish(Number(id));

    res.status(200).json({ message: 'Finished' });
  };

  public changeResults = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matchesService = new MatchesService();
    await matchesService.changeResults(Number(id), req.body);

    res.status(200).json({ message: 'Goals updated!' });
  };
}

export default MatchesController;
