export interface IMyVitals {
  age?: string;
  bloodPresure?: string;
  bloodSugarAfterMeal?: string;
  bloodSugarBeforeMeal?: string;
  bodyTempture?: string;
  createdDate?: Date;
  heartRate?: string;
  height?: string;
  id?: number;
  lastModifiedDate?: Date;
  respiratoryRate?: string;
  userId?: number;
  weight?: string;
}

export class MyVitals implements IMyVitals {
  constructor(
    public age?: string,
    public bloodPresure?: string,
    public bloodSugarAfterMeal?: string,
    public bloodSugarBeforeMeal?: string,
    public bodyTempture?: string,
    public createdDate?: Date,
    public heartRate?: string,
    public height?: string,
    public id?: number,
    public lastModifiedDate?: Date,
    public respiratoryRate?: string,
    public userId?: number,
    public weight?: string
  ) {}
}
