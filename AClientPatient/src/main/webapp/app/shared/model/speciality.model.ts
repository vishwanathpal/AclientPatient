
export interface ISpeciality {
  id?: number;
  name?: string;
  code?: string;
}

export class Speciality implements ISpeciality {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string
  ) {}
}
