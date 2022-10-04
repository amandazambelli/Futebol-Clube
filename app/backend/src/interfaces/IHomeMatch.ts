import IHomeTeamMatch from './IHomeTeamMatch';

export default interface IHomeMatch {
  id?: number,
  teamName: string,
  homeTeamMatches: IHomeTeamMatch[]
}
