
export interface ISearch {
  id?: number;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  phoneNumber?: string;
  locations?: string[];
  specialities?: string[];
  specialitiesStr?: string;
  email?: string;
}

export class Search implements ISearch {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public imageUrl?: string,
    public phoneNumber?: string,
    public locations?: string[],
    public specialities?: string[],
    public specialitiesStr?: string,
    public email?: string
  ) {}
}
