import ISite from '../@types/site.type';
import Node from './node';

class Grafo {
  nodes: Node[];

  constructor() {
    this.nodes = [];
  }

  insert(site: Omit<ISite, 'links'>) {
    const node = new Node(site);
    this.nodes.push(node);
    return node;
  }

  bulkInsert(sites: ISite[]) {
    for (const site of sites) {
      const node = this.insert(site);

      if (site.links) {
        const relations = site.links.map((site) => new Node(site));
        node.insertRelations(relations);
      }
    }
  }

  private unvisitAll(node?: Node) {
    if (!node) {
      for (const node of this.nodes) {
        this.unvisitAll(node);
      }
    } else {
      node.unVisit();

      for (const relation of node.relations) {
        this.unvisitAll(relation);
      }
    }
  }

  search(node: Node, value: string): Node | null {
    if (!node.visited) {
      node.visit();

      const regex = new RegExp(value, 'i');
      const match = regex.test(node.value.title) || regex.test(node.value.description);

      if (match) {
        return node;
      }
    }

    for (const relation of node.relations) {
      if (!relation.visited) {
        const findedNode = this.search(relation, value);

        if (findedNode) {
          return findedNode;
        }
      }
    }

    return null;
  }

  searchAll(firstNode: Node | null, value: string, matched: Node[] = []) {
    let matchedNodes = matched;

    if (!firstNode) {
      for (const node of this.nodes) {
        if (!node.visited) {
          matchedNodes = this.searchAll(node, value, matchedNodes);
        }
      }

      return matchedNodes;
    } else {
      const findedNode = this.search(firstNode, value);
      const isMatched = matchedNodes.some((node) => node.value.id === findedNode?.value.id);

      if (findedNode && !isMatched) {
        matchedNodes.push(findedNode);
        matchedNodes = this.searchAll(findedNode, value, matchedNodes);
      }

      this.unvisitAll();
      return matchedNodes;
    }
  }
}

export default Grafo;
