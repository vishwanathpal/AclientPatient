export interface IMyHealthProfile {
  id?: number;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export class MyHealthProfile implements IMyHealthProfile {
  constructor(public id?: number, public firstName?: string, public lastName?: string, public imageUrl?: string) {}
}
