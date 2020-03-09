export interface ICollision {
  [index: string]: any;
  id: string;
  date_time: number;
  x: number;
  y: number;
  location: string;
  ped_count: number;
  cycler_count: number;
  person_count: number;
  vehicle_count: number;
  injury_count: number;
  serious_injury_count: number;
  fatality_count: number;
  dui: boolean;
}

export class Collision implements ICollision {
  [index: string]: any;
  constructor(collision?: ICollision) {
    if (collision) {
      Object.assign(this, collision);
    }
  }

  id: string;
  date_time: number;
  x: number;
  y: number;
  location: string;
  ped_count: number = 0;
  cycler_count: number = 0;
  person_count: number = 0;
  vehicle_count: number = 0;
  injury_count: number = 0;
  serious_injury_count: number = 0;
  fatality_count: number = 0;
  dui: boolean = false;
}
