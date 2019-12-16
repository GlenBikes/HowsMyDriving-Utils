import {ICitation} from './icitation';
import {Citation} from './icitation';

export interface IRegion {
  readonly name: string;
  
  GetCitationsByPlate: (plate: string, state: string) => Promise<Array<Citation>>;
  ProcessCitationsForRequest: (citations: ICitation[], query_count: number) => Array<string>;
}

export class Region {
  
  constructor(name: string) {
    this.name = name;
  }
  
  readonly name: string;
}

