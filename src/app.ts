//import { WriteStream, createWriteStream } from "fs";

// DELETE LATER - JUST FOR TEST PURPOSES
//let writeStream = createWriteStream("../out/graph.txt") as WriteStream;  //that's what we output

const labyrinth: number[] = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  3,
  3,
  3,
  1,
  1,
  1,
  3,
  3,
  3,
  3,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  3,
  3,
  3,
  1,
  3,
  1,
  3,
  1,
  3,
  3,
  3,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  3,
  1,
  3,
  1,
  3,
  1,
  1,
  1,
  3,
  3,
  1,
  1,
  1,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  1,
  2,
  2,
  1,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  3,
  3,
  3,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  3,
  3,
  3,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  3,
  3,
  1,
  1,
  3,
  1,
  1,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  3,
  1,
  1,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
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
//console.log(graphRepresentation.adj_list);
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

type PriorityQueue = {
  vertex: number;
  distance: number;
};

function DijkstraShortestWay(
  start: number,
  finish: number,
  currentGraph: Graph, // the only thing we need from it is adj_list
): number[] {
  const adj_list = currentGraph.adj_list;
  // const adj_list_length = Object.keys(adj_list).length;

  const seen: SeenList = {};
  const info: InfoList = {};

  const queue: PriorityQueue[] = [{ vertex: start, distance: 0 }];
  info[start] = {
    parent: -1,
    lowestDist: 0,
  };

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const { vertex } = queue.shift()!;
    if (seen[vertex]) {
      continue;
    }
    seen[vertex] = true;

    for (const elem of adj_list[vertex]) {
      if (seen[elem.index]) {
        continue;
      }

      const newLowest = info[vertex].lowestDist + elem.weight;

      if (!info[elem.index] || newLowest < info[elem.index].lowestDist) {
        info[elem.index] = {
          parent: vertex,
          lowestDist: newLowest,
        };

        queue.push({
          vertex: elem.index,
          distance: newLowest,
        });
      }
    }
  }

  const out: number[] = [];
  let curr = finish;

  while (info[curr].parent !== -1) {
    out.push(curr);
    curr = info[curr].parent;
  }

  out.push(start);

  return out.reverse();
  // const adj_list = currentGraph.adj_list;
  // const adj_list_length = Object.keys(adj_list).length;
  // // object to contain all of our seen vertices
  // const seen: SeenList = {};
  // const info: InfoList = {};
  //
  // // const queue: PriorityQueue[] = [{vertex: start, distance: 0}];
  //
  // info[start] = {
  //   parent: -1,
  //   lowestDist: 0,
  // };
  //
  // seen[start] = true;
  //
  // let current: number = start;
  // while (Object.keys(seen).length !== adj_list_length) {
  //   let minDist = Infinity;
  //   let nextVertex = current;
  //   for (const elem of adj_list[current]) {
  //     if (Object.hasOwn(seen, elem.index)) {
  //       continue;
  //     }
  //
  //     info[elem.index] = {
  //       parent: current,
  //       lowestDist: Infinity,
  //     };
  //     let newLowest = info[current].lowestDist + elem.weight;
  //     if (newLowest < info[elem.index].lowestDist) {
  //       info[elem.index].lowestDist = newLowest;
  //     }
  //
  //     if (info[elem.index].lowestDist < minDist) {
  //       minDist = info[elem.index].lowestDist;
  //       nextVertex = elem.index;
  //       console.log("nextVertex", nextVertex);
  //     }
  //   }
  //   current = nextVertex; // потрібно покращити умову - я рухаюся по дереву, але застрягаю на місці, якщо діти вершини вже були пройдені
  //   seen[current] = true;
  // }
  //
  // // result generation
  // const out: number[] = [];
  // let curr = finish;
  //
  // while (info[curr].parent !== -1) {
  //   out.push(curr);
  //   curr = info[curr].parent;
  // }
  //
  // out.push(start);
  // console.log(out);
  // return out.reverse();
}
// const dist = DijkstraShortestWay(206, 242, graphRepresentation);
const dist = DijkstraShortestWay(19, 304, graphRepresentation);
console.log(dist);
//
//
export default { DijkstraShortestWay, graphRepresentation };
