import { Coordinates } from "./coordinates.model";
import { MacDetail } from "./macdetails.model";

export class Device{
  _id: string;
  Name : string;
  Ip: string;
  Port: string;
  Username: string;
  Password: string;
  IsEnabled: boolean;
  UseNSO: boolean;
  macDetails: MacDetail;
  coordinates: Coordinates;
  kind?:string = 'doc';
}
