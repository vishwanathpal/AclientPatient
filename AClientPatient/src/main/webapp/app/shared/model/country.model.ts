
export interface ICountry {
  id?: number;
  country?: string;
  code?: string;
}

export class Country implements ICountry {
  constructor(
    public id?: number,
    public country?: string,
    public code?: string
  ) {}
}
