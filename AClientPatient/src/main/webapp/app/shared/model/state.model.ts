
export interface IState {
  id?: number;
  state?: string;
  code?: string;
}

export class State implements IState {
  constructor(
    public id?: number,
    public state?: string,
    public code?: string
  ) {}
}
