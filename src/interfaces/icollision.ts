import { log } from '../../src/logging';

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

  /* Used?
  public date_string = (): string => {
    new Date(this.date_time);
  };
  */

  public toString = (): string => {
    return `id: ${this.id}\ndate_time: ${this.date_time}\nx,y: ${this.x},${this.y}\nlocation: ${this.location}\nped_count: ${this.ped_count}\ncycler_count: ${this.cycler_count}\nperson_count: ${this.person_count}\ninjury_count: ${this.injury_count}\nserious_injury_count: ${this.serious_injury_count}\nfatality_count: ${this.fatality_count}\ndui: ${this.dui}`;
  };

  public getType = (): string => {
    let type: string = 'unspecified';

    if (this.fatality_count > 0) {
      type = 'fatal';
    } else if (this.serious_injury_count > 0) {
      type = 'serious injury';
    } else if (this.injury_count > 0) {
      type = 'injury';
    }

    return type;
  };

  public shouldTweet = (
    last_tweeted: number,
    collision_type: string
  ): boolean => {
    let shouldTweet: boolean = false;
    let nowDate = new Date();
    let lastTweetedDate = new Date(last_tweeted);

    // TODO: Certain collisions should be tweeted more frequently based on type.
    if (
      this.date_time > last_tweeted ||
      lastTweetedDate.getFullYear() < nowDate.getFullYear() ||
      lastTweetedDate.getMonth() < nowDate.getMonth()
    ) {
      log.debug(
        `Tweeting last ${collision_type} collision from ${this.date_time_str}.`
      );

      shouldTweet = true;
    }

    return shouldTweet;
  };
}
