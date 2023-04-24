import { Model } from "../Model";

export interface MeetingPlatform extends Model {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
