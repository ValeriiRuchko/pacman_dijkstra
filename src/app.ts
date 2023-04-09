//import { WriteStream, createWriteStream } from "fs";

// DELETE LATER - JUST FOR TEST PURPOSES
//let writeStream = createWriteStream("../out/graph.txt") as WriteStream;  //that's what we output

const labyrinth: number[] = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1,
  3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 1, 3, 1, 3, 1, 3, 3, 3, 1,
  1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 3, 3, 1, 1, 1, 3, 3, 3, 3, 3,
  3, 3, 3, 3, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3,
  3, 3, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1,
  3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 2, 2, 1, 1,
  1, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 1, 1, 3,
  1, 1, 3, 1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 2, 2, 2, 2,
  2, 2, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3, 1,
  1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

const width = 18; // rows of squares in labyrinth
// const columns = 18; // columns of squares in labyrinth

// vertices, which will be used in adjacency list as value (у списку вершин, суміжних (adjacent) до даної)
interface WeightedNode {
  index: number;
  weight: number;
}
// вершина з масивом прилеглих вершин
class Vertex {
  index: number;
  adjacent_vertices: WeightedNode[] = []; // will be later populated with help of a method "addEdge"

  constructor(index: number) {
    this.index = index;
  }

  addAdjacent(newAdjacentVertice: number) {
    this.adjacent_vertices.forEach((element) => {
      if (element.index === newAdjacentVertice) {
        return;
      }
    });
    this.adjacent_vertices.push({ index: newAdjacentVertice, weight: 1 });
  }
}

interface Adjacency_list {
  [index: string]: WeightedNode[];
}

// Graph
class Graph {
  adj_list: Adjacency_list;

  constructor() {
    this.adj_list = {};
  }

  addVertex(newVertice: Vertex) {
    // If the vertex already exists, do nothing.
    if (this.adj_list[newVertice.index] !== undefined) {
      return; //stops execution of the function
    }
    this.adj_list[newVertice.index] = newVertice.adjacent_vertices;
  }
}

function createGraph(processed_arr: number[]) {
  // iterate through array, exclude all walls and check if the added vertices don't already exist
  let graph = new Graph();
  processed_arr.forEach((element, index) => {
    if (element !== 1) {
      let newVertice = new Vertex(index);
      if (processed_arr[index + 1] !== 1) {
        newVertice.addAdjacent(index + 1);
      }
      if (processed_arr[index - 1] !== 1) {
        newVertice.addAdjacent(index - 1);
      }
      if (processed_arr[index + width] !== 1) {
        newVertice.addAdjacent(index + width);
      }
      if (processed_arr[index - width] !== 1) {
        newVertice.addAdjacent(index - width);
      }
      graph.addVertex(newVertice);
    }
  });
  return graph;
}

let graphRepresentation = createGraph(labyrinth);
console.log("length", Object.keys(graphRepresentation.adj_list).length);
// ----- ----- ----- ----- -----
// for(const key of Object.keys(graphRepresentation.adj_list)) {
//   writeStream.write(JSON.stringify(key) + ":" + JSON.stringify(graphRepresentation.adj_list[key]) + '\n\n');
// }
console.log(graphRepresentation.adj_list);
// ----- ----- ----- ----- -----

type Info = {
  parent: number;
  lowestDist: number;
};

type InfoList = {
  [index: number]: Info;
};

type SeenList = {
  [index: number]: boolean;
};

function DijkstraShortestWay(
  start: number,
  finish: number,
  currentGraph: Graph // the only thing we need from it is adj_list
): number[] {
  const adj_list = currentGraph.adj_list;
  const adj_list_length = Object.keys(adj_list).length;
  // object to contain all of our seen vertices
  const seen: SeenList = {};
  const info: InfoList = {};

  // for (let k of Object.keys(adj_list)) {
  //   info[+k as number] = {
  //     parent: 0,
  //     lowestDist: Infinity,
  //   };
  // }
  //
  info[start] = {
    parent: -1,
    lowestDist: 0,
  };

  let current: number = start;
  while (Object.keys(seen).length !== adj_list_length) {
    seen[current] = true;
    for (const elem of adj_list[current]) {
      if (Object.hasOwn(seen, elem.index)) {
        continue;
      }

      info[elem.index] = {
        parent: current,
        lowestDist: Infinity,
      };
      let newLowest = info[current].lowestDist + elem.weight;
      if (newLowest < info[elem.index].lowestDist) {
        info[elem.index].lowestDist = newLowest;
      }

      console.log("current", current);
      current = elem.index; // потрібно покращити умову - я рухаюся по дереву, але застрягаю на місці, якщо діти вершини вже були пройдені
    }

    // problem - how do we choose our fucking next Vertex
    // current = ???
  }

  // result generation
  const out: number[] = [];
  let curr = finish;

  while (info[curr].parent !== -1) {
    out.push(curr);
    curr = info[curr].parent;
  }

  out.push(start);
  console.log(out);
  return out.reverse();
}

DijkstraShortestWay(19, 80, graphRepresentation);
