import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  private id!: number;
  private teamName!: string;
}

Team.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Team;
