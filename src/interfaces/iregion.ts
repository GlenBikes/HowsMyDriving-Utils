import {ICitation} from './icitation';
import {Citation} from './icitation';

export interface IRegion {
  GetCitationsByPlate: (plate: string, state: string) => Promise<Array<Citation>>,
  ProcessCitationsForRequest: (citations: ICitation[], query_count: number) => Array<string>
}

