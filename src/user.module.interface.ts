export interface IUserModule {
  fullName: string;
  createUser(fullName: string): IUserModule;
}
