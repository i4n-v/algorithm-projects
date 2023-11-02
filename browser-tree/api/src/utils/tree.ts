import ISite from '../@types/site.type';
import Node from './node';

class Tree {
  private root: Node | null;

  constructor() {
    this.root = null;
  }

  insert(value: ISite) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  bulkInsert(values: ISite[]) {
    values.forEach((value) => {
      this.insert(value);
    });
  }

  private insertNode(node: Node, newNode: Node) {
    if (newNode.value.title < node.value.title) {
      if (node.leftNode === null) {
        node.leftNode = newNode;
      } else {
        this.insertNode(node.leftNode, newNode);
      }
    } else {
      if (node.rightNode === null) {
        node.rightNode = newNode;
      } else {
        this.insertNode(node.rightNode, newNode);
      }
    }
  }

  search(value: string) {
    return this.searchNode(this.root, value);
  }

  searchAll(value: string) {
    const nodes: Node[] = [];

    let running = true;
    let node = this.root;

    while (running) {
      const findedNode = this.searchNode(node, value);

      if (findedNode) {
        if (value < findedNode.value.title) {
          node = findedNode.leftNode;
        } else {
          node = findedNode.rightNode;
        }

        nodes.push(findedNode);
      } else {
        running = false;
      }
    }

    return nodes;
  }

  private searchNode(node: Node | null, value: string): Node | null {
    if (node === null) return null;

    const regex = new RegExp(value, 'i');
    const macth = regex.test(node.value.title) || regex.test(node.value.description);

    if (macth) return node;

    if (value < node.value.title) {
      return this.searchNode(node.leftNode, value);
    }

    return this.searchNode(node.rightNode, value);
  }
}

export default Tree;
