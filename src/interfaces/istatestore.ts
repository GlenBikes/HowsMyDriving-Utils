export interface IStateStore {
  readonly region_name: string;

  GetStateValue(keyname: string): Promise<string>;
  PutStateValue(keyname: string, keyvalue: string);
}
