interface IHasId {
  id: number;
}
interface IHasName {
  name: string;
}
interface IHasShortName {
  short_name: string;
}
interface ICategory extends IHasName {}
interface ILocation extends IHasName {}
interface ILevel extends IHasName, IHasShortName {}
interface ICompany extends IHasId, IHasName, IHasShortName {}

export interface IJobResult extends IHasId, IHasName, IHasShortName {
  categories: ICategory[];
  company: ICompany;
  contents: string;
  levels: ILevel[];
  locations: ILocation[];
  model_type: string;
  publication_date: string;
  refs: { landing_page: string };
  tags: any[];
  type: string;
}

export interface IJobPageResults {
  aggregations: any;
  items_per_page: number;
  page: number;
  page_count: number;
  results: IJobResult[];
  timed_out: boolean;
  took: number;
  total: number;
}

export interface IAppState {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  applications: IApplicationModel[];
  setApplications: React.Dispatch<React.SetStateAction<IApplicationModel[]>>;
  user: IUserModel | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUserModel | undefined>>;
  fetchApplications: () => void;
  getLoggedIn: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  currentJobPageResults: IJobPageResults;
  setCurrentJobPageResults: React.Dispatch<React.SetStateAction<IJobPageResults>>;
}

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
