import { ICitation, Citation } from './icitation';
import { ICollision, Collision } from './icollision';
import { IStateStore } from './istatestore';

export interface IRegion {
  readonly name: string;
  state_store: IStateStore;

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

export abstract class RegionFactory {
  public abstract createRegion(state_store: IStateStore): Promise<Region>;
}

export abstract class Region implements IRegion {
  constructor(name: string, state_store: IStateStore) {
    this.name = name;

    this.state_store = state_store;
  }

  readonly name: string;
  state_store: IStateStore;

  abstract GetCitationsByPlate(
    plate: string,
    state: string
  ): Promise<Array<ICitation>>;

  abstract ProcessCitationsForRequest(
    citations: ICitation[],
    query_count: number
  ): Array<string>;

  abstract ProcessCollisions(
    collisions: Array<ICollision>
  ): Promise<Array<string>>;

  abstract GetRecentCollisions(): Promise<Array<ICollision>>;
}
