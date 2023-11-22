interface ISite {
  id: string;
  url: string;
  favicon_url: string;
  title: string;
  description: string;
  links: ISite[] | null;
}

export default ISite;
