import ISite from './site.type';

interface ISearch extends ISite {
  links: ISite[];
}

export default ISearch;
