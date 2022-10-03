import { Request, Response } from 'express';
import BoardService from '../services/boardService';

class BoardController {
  public getLeaderBoard = async (req: Request, res: Response) => {
    const boardService = new BoardService();
    const showBoard = await boardService.getLeaderBoard();

    res.status(200).json(showBoard);
  };
}

export default BoardController;
