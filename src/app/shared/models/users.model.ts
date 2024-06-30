
export class Users {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public role: number,
    public userId?: number,
    public password?: string,
  ) { }
}
