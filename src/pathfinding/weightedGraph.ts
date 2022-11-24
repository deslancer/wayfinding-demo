import {PriorityQueue} from "./priorityQueue";
import {Vector3} from "@babylonjs/core/Maths/math.vector";

export interface IGraph {
    nodes: Set<any>;
    adjacencyList: object;
    adjacents: Array<any>;

    addNode(node: any): void;

    addEdgeMeshGraph(node1: number, node2: number, positions: Array<any>): void;

    addEdgeArrayGraph(node1: string, node2: string, position1: Vector3, position2: Vector3): void;

    findPathWithDijkstra(startNode: number, endNode: number): Array<any>;
}

export class WeightedGraph implements IGraph {

    adjacencyList: any = {};
    adjacents: Array<any> = [];
    nodes: Set<any> = new Set();

    addEdgeMeshGraph(node1: number, node2: number, positions: Array<any>): void {
        if (!(this.adjacents[node1].has(node2) && this.adjacents[node2].has(node1))) {
            let weight = Math.pow(positions[3 * node1] - positions[3 * node2], 2) + Math.pow(positions[3 * node1 + 1] - positions[3 * node2 + 1], 2) + Math.pow(positions[3 * node1 + 2] - positions[3 * node2 + 2], 2);
            weight = Math.sqrt(weight);
            this.adjacencyList[node1].push({node: node2, weight: weight});
            this.adjacencyList[node2].push({node: node1, weight: weight});
            this.adjacents[node1].add(node2);
            this.adjacents[node2].add(node1);
        }
    }

    addNode(node: any): void {
        if (!this.nodes.has(node)) {
            this.nodes.add(node);
            this.adjacencyList[node] = [];
            this.adjacents[node] = new Set();
        }
    }


    addEdgeArrayGraph(node1: any, node2: any, position1: Vector3, position2: Vector3): void {
        if (!(this.adjacents[node1].has(node2) && this.adjacents[node2].has(node1))) {
            let weight = Vector3.Distance(position1, position2)
            this.adjacencyList[node1].push({node: node2, weight: weight});
            this.adjacencyList[node2].push({node: node1, weight: weight});
            this.adjacents[node1].add(node2);
            this.adjacents[node2].add(node1);
        }
    }

    findPathWithDijkstra(startNode: any, endNode: any): Array<any> {

        let distances: any = {};
        let backtrace: any = {};
        let pq: PriorityQueue = new PriorityQueue();

        distances[startNode] = 0;

        this.nodes.forEach(node => {
            if (node !== startNode) {
                distances[node] = Infinity
            }
        });

        pq.enqueue([startNode, 0]);

        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            //console.log(this.adjacencyList)
            this.adjacencyList[currentNode].forEach((neighbor: { weight: any; node: string | number; }) => {
                let distance = distances[currentNode] + neighbor.weight;

                if (distance < distances[neighbor.node]) {
                    distances[neighbor.node] = distance;
                    backtrace[neighbor.node] = currentNode;
                    pq.enqueue([neighbor.node, distance]);
                }
            });
        }

        let path = [endNode];
        let lastStep = endNode;
        while (lastStep !== startNode) {
            path.unshift(backtrace[lastStep])
            lastStep = backtrace[lastStep]
        }
        console.log("distance", distances[endNode])
        return path;
    }


}