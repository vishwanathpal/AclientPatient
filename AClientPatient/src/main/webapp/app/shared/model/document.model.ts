export interface IDocument {
  id?: number;
  typeName?: string;
  typeDiscription?: string;
}

export class Document implements IDocument {
  constructor(public id?: number, public typeName?: string, public typeDiscription?: string) {}
}
