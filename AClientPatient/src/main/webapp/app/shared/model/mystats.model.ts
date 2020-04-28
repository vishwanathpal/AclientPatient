export interface IMyStats {
  age?: string;
  createdBy?: string;
  createdDate?: Date;
  height?: string;
  id?: number;
  updatedBy?: string;
  updatedDate?: Date;
  userId?: number;
  weight?: string;
}

export class MyStats implements IMyStats {
  constructor(
    public age?: string,
    public createdBy?: string,
    public createdDate?: Date,
    public height?: string,
    public id?: number,
    public updatedBy?: string,
    public updatedDate?: Date,
    public userId?: number,
    public weight?: string
  ) {}
}
