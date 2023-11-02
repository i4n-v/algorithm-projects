import ISite from '../@types/site.type';

class Node {
  leftNode: Node | null;
  rightNode: Node | null;
  value: ISite;

  constructor(value: ISite) {
    this.leftNode = null;
    this.rightNode = null;
    this.value = value;
  }
}

export default Node;
