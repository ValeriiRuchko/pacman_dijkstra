"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labyrinth = [
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
const width = 18;
class Vertex {
    index;
    adjacent_vertices = [];
    constructor(index) {
        this.index = index;
    }
    addAdjacent(newAdjacentVertice) {
        this.adjacent_vertices.forEach((element) => {
            if (element.index === newAdjacentVertice) {
                return;
            }
        });
        this.adjacent_vertices.push({ index: newAdjacentVertice, weight: 1 });
    }
}
class Graph {
    adj_list;
    constructor() {
        this.adj_list = {};
    }
    addVertex(newVertice) {
        if (this.adj_list[newVertice.index] !== undefined) {
            return;
        }
        this.adj_list[newVertice.index] = newVertice.adjacent_vertices;
    }
}
function createGraph(processed_arr) {
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
function DijkstraShortestWay(start, finish, currentGraph) {
    const adj_list = currentGraph.adj_list;
    const seen = {};
    const info = {};
    const queue = [{ vertex: start, distance: 0 }];
    info[start] = {
        parent: -1,
        lowestDist: 0,
    };
    while (queue.length > 0) {
        queue.sort((a, b) => a.distance - b.distance);
        const { vertex } = queue.shift();
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
    const out = [];
    let curr = finish;
    while (info[curr].parent !== -1) {
        out.push(curr);
        curr = info[curr].parent;
    }
    out.push(start);
    return out.reverse();
}
const dist = DijkstraShortestWay(206, 242, graphRepresentation);
console.log(dist);
exports.default = { DijkstraShortestWay, graphRepresentation };
//# sourceMappingURL=app.js.map