export interface IDashboard {
  id?: number;
  name?: string;
  surname?: string;
}

export class Dashboard implements IDashboard {
  constructor(public id?: number, public name?: string, public surname?: string) {}
}
