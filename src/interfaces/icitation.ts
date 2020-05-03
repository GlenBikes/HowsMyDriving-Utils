export interface ICitation {
  [index: string]: any;
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
}
