import { log } from '../../src/logging';

export interface ICollision {
  [index: string]: any;

  id: string;

  getCollisionType(): string;
  shouldTweet(last_tweeted: number, collision_type: string): boolean;
  toString(): string;
}

export abstract class Collision implements ICollision {
  [index: string]: any;
  constructor(collision?: ICollision) {
    if (collision) {
      Object.assign(this, collision);
    }
  }

  id: string;

  abstract getCollisionType(): string;

  abstract toString(): string;

  abstract shouldTweet(last_tweeted: number, collision_type: string): boolean;

  /*
  abstract toString = (): string => {
    return `id: ${this.id}\ndate_time: ${this.date_time}\nx,y: ${this.x},${this.y}\nlocation: ${this.location}\nped_count: ${this.ped_count}\ncycler_count: ${this.cycler_count}\nperson_count: ${this.person_count}\ninjury_count: ${this.injury_count}\nserious_injury_count: ${this.serious_injury_count}\nfatality_count: ${this.fatality_count}\ndui: ${this.dui}`;
  };
  */
}
