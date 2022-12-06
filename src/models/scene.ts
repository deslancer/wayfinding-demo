import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { ISceneLoaderAsyncResult, SceneLoader } from "@babylonjs/core/Loading/sceneLoader";

import '@babylonjs/loaders'
import { AbstractMesh, ActionManager, EnvironmentHelper, ExecuteCodeAction } from "@babylonjs/core";
import { highlighter, mainScene, nav_points, selected_point, shops_list } from "../controllers/store";
import { Highlight } from "./meshSelection";

import type { NodePointInterface } from "./node-point.interface";


export const createScene = ( canvas ) => {
    const engine = new Engine( canvas, true, { stencil: true } );
    const scene = new Scene( engine );
    scene.clearColor = new Color4( 0.0, 0.0, 0.0, 0.0 ) //scene background color
    const actionManager = new ActionManager( scene )
    const hl = new Highlight(scene);
    const camera = new ArcRotateCamera(
        "camera",
        2.13,
        Math.PI / 3,
        100,
        new Vector3( 0, 0, 0 ),
        scene
    );
    camera.attachControl( canvas, true );

    const light = new HemisphericLight( "light", new Vector3( 0, 1, -15 ), scene );
    light.intensity = 0.7;

    const material = new StandardMaterial( "material", scene );
    material.emissiveColor = new Color3( 0.3, 0.3, 0.3 );
    new EnvironmentHelper( {
        skyboxTexture: undefined,
        createGround: false
    }, scene )
    const importResult = SceneLoader.ImportMeshAsync(
        "",
        "/assets/meshes/",
        'mall.glb',
        scene,
        undefined,
        ".glb"
    );
    importResult.then( ( result: ISceneLoaderAsyncResult ) => {
        const meshes: Array<AbstractMesh> = result.meshes;
        const nav_points_arr: Array<NodePointInterface> = [];
        const shops_arr: Array<AbstractMesh> = [];
        meshes.forEach( ( mesh: AbstractMesh ) => {
            mesh.actionManager = actionManager;
            if ( mesh.name.includes( 'np' ) ) {
                nav_points_arr.push( {
                    attachedShopNode: "",
                    nodeName: mesh.name,
                    relations: []
                } )
            }
            if ( mesh.name.includes( 'shop' ) ) {
                shops_arr.push( mesh )
            }
        } )
        shops_list.update(()=>{
            return shops_arr
        })
        nav_points.update( () => {
            return nav_points_arr
        } )
    } )

    actionManager.registerAction( new ExecuteCodeAction( ActionManager.OnLeftPickTrigger, ( ev ) => {
        if ( ev.meshUnderPointer ) {
            const mesh: AbstractMesh = ev.meshUnderPointer;
            if ( mesh.name.includes('np')) {
                hl.highlightMesh( mesh )
                selected_point.update(()=>{
                    return mesh.name
                })
            }

        }
    } ) )


    engine.runRenderLoop( () => {
        scene.render();
    } );

    window.addEventListener( 'resize', () => {
        engine.resize();
    } );
    mainScene.update(()=>{
        return scene;
    })
    highlighter.update(()=>{
        return hl;
    })
    return scene;
}