
export class Users {
  constructor(
    public userId: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: number,
  ) { }
}