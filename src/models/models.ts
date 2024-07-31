export interface IUserModel {
  username: string;
  email: string;
  passwordHash: string;
  applications: [
    {
      type: any;
      ref: "Application";
    }
  ];
}

export interface IApplicationModel {
  _id: string;
  user: string;
  company: string;
  position: string;
  website: string;
  location: string;
  applied: string;
  response: string;
  comments: string;
  status: string;
  __v: number;
}
