
export interface ICity {
  id?: number;
  name?: string;
  code?: string;
}

export class City implements ICity {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string
  ) {}
}
