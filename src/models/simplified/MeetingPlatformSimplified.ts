import { Model } from "../Model";

export interface MeetingPlatformSimplified extends Model {
  id: string;
  name: string;
  description: string;
  baseUrl: string;
}
