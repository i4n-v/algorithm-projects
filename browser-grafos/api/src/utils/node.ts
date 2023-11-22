import ISite from '../@types/site.type';

class Node {
  value: Omit<ISite, 'links'>;
  relations: Node[];
  visited: boolean;

  constructor(value: Omit<ISite, 'links'>) {
    this.relations = [];
    this.value = value;
    this.visited = false;
  }

  visit() {
    this.visited = true;
  }

  unVisit() {
    this.visited = false;
  }

  insertRelations(relations: Node[]) {
    this.relations.push(...relations);
  }
}

export default Node;
