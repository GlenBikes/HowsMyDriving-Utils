import { ICitation, Citation } from './icitation';
import { ICollision, Collision } from './icollision';
import { IStateStore } from './istatestore';

export interface IRegion {
  readonly name: string;
  state_store: IStateStore;

  Initialize(IStateStore);

  GetCitationsByPlate: (
    plate: string,
    state: string
  ) => Promise<Array<ICitation>>;

  ProcessCitationsForRequest: (
    citations: ICitation[],
    query_count: number
  ) => Array<string>;

  ProcessCollisions: (collisions: Array<ICollision>) => Promise<Array<string>>;

  GetRecentCollisions: () => Promise<Array<ICollision>>;
}

export class Region {
  constructor(name: string) {
    this.name = name;
  }

  readonly name: string;
  state_store: IStateStore;

  Initialize(state_store: IStateStore) {
    this.state_store = state_store;
  }
}
