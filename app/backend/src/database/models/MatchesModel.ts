import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Matches extends Model {
  private id!: number;
  private homeTeam!: number;
  private homeTeamGoals!: number;
  private awayTeam!: number;
  private awayTeamGoals!: number;
  private inProgress!: number;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Matches, { foreignKey: 'homeTeam', as: 'matches' });
Team.hasMany(Matches, { foreignKey: 'awayTeam', as: 'otherMatches' });

export default Matches;
