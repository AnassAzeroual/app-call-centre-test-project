import { Notifications } from "./notifications.model";
import { Tickets } from "./tickets.model";

export class Users {
    constructor(
      public userId: number,
      public firstName: string = "John", // Optional with default value
      public lastName: string = "Doe", // Optional with default value
      public email: string,
      public password: string,
      public role: number,
      public notifications: Notifications[] = [], // Empty array for notifications
      public tickets: Tickets[] = [], // Empty array for tickets
    ) {}
  }
  