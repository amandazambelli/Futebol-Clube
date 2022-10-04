import { IHomeTeamMatch, IAwayTeamMatch } from './IHomeTeamMatch';

interface IHomeMatch {
  id?: number,
  teamName: string,
  homeTeamMatches: IHomeTeamMatch[]
}

interface IAwayMatch {
  id?: number,
  teamName: string,
  awayTeamMatches: IAwayTeamMatch[]
}

export { IHomeMatch, IAwayMatch };
