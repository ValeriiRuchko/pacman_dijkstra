"use strict";
const labyrinth = [
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
console.log(graphRepresentation.adj_list);
function DijkstraShortestWay(start, finish, currentGraph) {
    const adj_list = currentGraph.adj_list;
    const adj_list_length = Object.keys(adj_list).length;
    const seen = {};
    const info = {};
    info[start] = {
        parent: -1,
        lowestDist: 0,
    };
    let current = start;
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
            current = elem.index;
        }
    }
    const out = [];
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
//# sourceMappingURL=app.js.map