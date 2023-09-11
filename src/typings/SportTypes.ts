import { League } from './LeagueTypes';

export type Sport = {
  _id?: string
  name: string,
  image: string,
  leaguesDetails?: League[]
}
