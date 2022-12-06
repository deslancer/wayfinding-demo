import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { HighlightLayer } from "@babylonjs/core/";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import type { Mesh } from "@babylonjs/core/Meshes/mesh";
import type { Scene } from "@babylonjs/core/scene";

export class Highlight {
    private hl_color: Color3 =  Color3.Green()
    highlightLayer: HighlightLayer;
    constructor(scene: any) {
        this.highlightLayer =  new HighlightLayer( 'hl', scene )
    }
    highlightMesh( mesh: AbstractMesh ): void {
        const hl_mesh = mesh as Mesh;
        this.highlightLayer.removeAllMeshes()
        if ( this.highlightLayer.hasMesh(hl_mesh) ){
            this.highlightLayer.removeMesh(hl_mesh)
        }else {
            this.highlightLayer.addMesh( hl_mesh, this.hl_color );
        }


    }
}
