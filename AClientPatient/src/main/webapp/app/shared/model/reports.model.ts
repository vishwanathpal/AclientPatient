import { User } from './user.model';
import { Document } from './document.model';

export interface IReports {
  id?: number;
  documentName?: string;
  s3BucketUrl?: string;
  activated?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  documentTypes?: Document;
  user?: User;
}

export class Reports implements IReports {
  constructor(
    public id?: number,
    public documentName?: string,
    public s3BucketUrl?: string,
    public activated?: string,
    public createdDate?: Date,
    public lastModifiedDate?: Date,
    public documentTypes?: Document,
    public user?: User
  ) {}
}
