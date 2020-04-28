export interface IUser {
  id?: number;
  firstName?: string;
  lastNumber?: string;
}

export class User implements IUser {
  constructor(public id?: number, public firstName?: string, public lastNumber?: string) {}
}
