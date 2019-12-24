export interface ICitation {
  [index: string]: any;
  citation_id: number;
  license: string;
  region: string;
}

export class Citation implements ICitation {
  [index: string]: any;
  constructor();
  constructor(citation: ICitation);
  constructor(citation?: ICitation) {
    if (citation) {
      Object.assign(this, citation);
    }
  }

  citation_id: number;
  license: string;
  region: string;
}
