
export interface IPatientVital {
  id?: number;
  bodyTempture?: string;
  respiratoryRate?: string;
  heartRate?: string;
  bloodPresure?: string;
  bloodSugarBeforeMeal?: string;
  bloodSugarAfterMeal?: string;
  age?: string;
  weight?: string;
  height?: string;
}

export class PatientVital implements IPatientVital {
  constructor(
  	public id?: number,
    public bodyTempture?: string,
    public respiratoryRate?: string,
    public heartRate?: string,
    public bloodPresure?: string,
    public bloodSugarBeforeMeal?: string,
    public bloodSugarAfterMeal?: string,
    public age?: string,
    public weight?: string,
    public height?: string
  ) {}
}
