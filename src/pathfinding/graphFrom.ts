import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh";
import {VertexBuffer} from "@babylonjs/core/";
import {WeightedGraph} from "./weightedGraph";

export const graphFromMesh = (mesh: AbstractMesh): WeightedGraph => {
    const graph = new WeightedGraph();
    const v = [];
    const positions: any = mesh.getVerticesData(VertexBuffer.PositionKind);
    const indices: any = mesh.getIndices();
    if (indices && positions) {
        const indLen = indices.length / 3;
        for (let index = 0; index < indLen; index++) {
            v[0] = indices[3 * index];
            v[1] = indices[3 * index + 1];
            v[2] = indices[3 * index + 2];
            for (let i = 0; i < 3; i++) {
                graph.addNode(v[i]);
            }
            for (let i = 0; i < 3; i++) {
                graph.addEdgeMeshGraph(v[i], v[(i + 1) % 3], positions);
            }
        }
    }

    return graph;
}
export const graphFromArray = (arr: Array<AbstractMesh>) => {
    const graph = new WeightedGraph();
    for (let i = 0; i < arr.length; i++) {
        graph.addNode(arr[i].name);
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1]) {
            graph.addEdgeArrayGraph(arr[i].name, arr[i + 1].name, arr[i].getAbsolutePosition(), arr[i + 1].getAbsolutePosition())
        }
    }
    return graph;
}