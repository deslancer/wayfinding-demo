import {Mesh} from "@babylonjs/core/Meshes/mesh";
import {Scene} from "@babylonjs/core/scene";


export const createStaticMesh = (scene: Scene) => {
    const meshes: Array<any> = [...scene.meshes]
    return Mesh.MergeMeshes(meshes);
}