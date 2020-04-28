
export interface ISlot {
  id?: number;
  userId?: number;
  isOccupied?: boolean;
  dateTime?: Date;
  patientID?: number;
  status?: string;
  endDateTime?: Date;
  organizationId?: number;
  date?: string;
}

export class Slot implements ISlot {
  constructor(
	public id?: number,
	public userId?: number,
	public isOccupied?: boolean,
	public dateTime?: Date,
	public patientID?: number,
	public status?: string,
	public endDateTime?: Date,
	public organizationId?: number,
	public date?: string
  ) {}
}
