import { User } from './user.model';

export interface IPrescriptions {
  active?: boolean;
  appointmentId?: number;
  createdDate?: Date;
  dietaryNote?: string;
  endDate?: Date;
  id?: number;
  lastModifiedDate?: Date;
  organizationId?: number;
  prescriptionPadId?: string;
  providerId?: number;
  providerPrescriptionId?: string;
  specialNote?: string;
  startDate?: Date;
  user?: User;
}

export class Prescriptions implements IPrescriptions {
  constructor(
    public active?: boolean,
    public appointmentId?: number,
    public createdDate?: Date,
    public dietaryNote?: string,
    public endDate?: Date,
    public id?: number,
    public lastModifiedDate?: Date,
    public organizationId?: number,
    public prescriptionPadId?: string,
    public providerId?: number,
    public providerPrescriptionId?: string,
    public specialNote?: string,
    public startDate?: Date,
    public user?: User
  ) {}
}
