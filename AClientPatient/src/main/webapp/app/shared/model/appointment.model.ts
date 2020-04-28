
export interface IAppointment {
  id?: number;
  providerID?: number;
  providerSlotID?: number;
  slotStartDateTime?: Date;
  slotEndDateTime?: Date;
  status?: string;
  message?: string;
  proFirstName?: string;
  proLastName?: string;
  proImageUrl?: string;
  proSpecialities?: string;
}

export class Appointment implements IAppointment {
  constructor(
  	public id?: number,
    public providerID?: number,
    public providerSlotID?: number,
    public slotStartDateTime?: Date,
    public slotEndDateTime?: Date,
    public status?: string,
    public message?: string,
    public proFirstName?: string,
    public proLastName?: string,
    public proImageUrl?: string,
    public proSpecialities?: string
  ) {}
}
