export interface ICitation {
  [index: string]: any;
  citation_id: number;
  license: string;
}

export class Citation implements ICitation {
  [index: string]: any;
  constructor(citation_id: number, license: string) {
    this.citation_id = citation_id;
    this.license = license;
  }
  
  citation_id: number;
  license: string;
}

