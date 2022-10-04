import { Request, Response } from 'express';
import BoardService from '../services/boardService';
import { returnBoard, sortBoard } from '../utils/homeLeaderBorder';
import { returnBoardAway, sortBoardAway } from '../utils/awayLeaderBorder';
import { IHomeMatch, IAwayMatch } from '../interfaces/IHomeMatch';
import ILeaderResults from '../interfaces/ILeaderResults';

class BoardController {
  public getHomeLeaderBoard = async (req: Request, res: Response) => {
    const boardService = new BoardService();
    const matches = await boardService.getHomeLeaderBoard() as unknown as IHomeMatch[];
    const boardInfo = await returnBoard(matches) as unknown as ILeaderResults[];

    const sortData = sortBoard(boardInfo);

    res.status(200).json(sortData);
  };

  public getAwayLeaderBoard = async (req: Request, res: Response) => {
    const boardService = new BoardService();
    const matches = await boardService.getAwayLeaderBoard() as unknown as IAwayMatch[];
    const boardInfo = await returnBoardAway(matches) as unknown as ILeaderResults[];

    const sortData = sortBoardAway(boardInfo);

    res.status(200).json(sortData);
  };
}

export default BoardController;
