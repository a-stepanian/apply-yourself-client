interface IHasId {
  id: number;
}
interface IHasName {
  name: string;
}
interface IHasShortName {
  short_name: string;
}
interface ILevel extends IHasName, IHasShortName {}
interface ICompany extends IHasId, IHasName, IHasShortName {}

export interface IJobResult extends IHasName, IHasShortName {
  _id: number;
  categories: IHasName[];
  company: ICompany;
  contents: string;
  levels: ILevel[];
  locations: IHasName[];
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

interface ICompanyRefs {
  f1_image: string;
  f2_image: string;
  f3_image: string;
  jobs_page: string;
  landing_page: string;
  logo_image: string;
  mini_f1_image: string;
}

export interface ICompanyResult extends IHasName, IHasShortName {
  _id: number;
  id: number;
  description: string;
  industries: IHasName[];
  locations: IHasName[];
  model_type: string;
  publication_date: string;
  refs: ICompanyRefs;
  tags: any[];
  twitter?: string;
}

export interface ICompanyPageResults {
  aggregations: any;
  items_per_page: number;
  page: number;
  page_count: number;
  results: ICompanyResult[];
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
  toggleUserDropdown: () => void;
  isUserDropdownOpen: boolean;
  currentJobPageResults: IJobPageResults;
  setCurrentJobPageResults: React.Dispatch<React.SetStateAction<IJobPageResults>>;
  currentCompanyPageResults: ICompanyPageResults;
  setCurrentCompanyPageResults: React.Dispatch<React.SetStateAction<ICompanyPageResults>>;
  setIsUserDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedJob: IJobResult | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<IJobResult | null>>;
  selectedCompany: ICompanyResult | null;
  setSelectedCompany: React.Dispatch<React.SetStateAction<ICompanyResult | null>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface IStyleTheme {
  name: string;
  primaryFont: string;
  primaryBorderRadius: string;
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  primaryBlue: string;
  primaryPink: string;
  primaryGreen: string;
}
