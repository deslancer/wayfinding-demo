import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight";
import {CreateSceneClass} from "../createScene";
import {SceneLoader} from "@babylonjs/core/Loading/sceneLoader";
import {CubeTexture} from "@babylonjs/core/Materials/Textures/cubeTexture";
import {EnvironmentHelper} from "@babylonjs/core/Helpers/environmentHelper";
import {Color3, Color4} from "@babylonjs/core/Maths/math.color";

// required imports
import "@babylonjs/core/Loading/loadingScreen";
import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Materials/standardMaterial";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
// digital assets, remove after API has been linked
import mall from "../../assets/glb/mall.glb";
import environment from "../../assets/environment/environment.env"
import {MeshBuilder, StandardMaterial} from "@babylonjs/core";
import {VertexBuffer} from "@babylonjs/core/";

import "recast-detour";
import {RecastJSPlugin} from "@babylonjs/core";
import {createStaticMesh} from "../pathfinding/createStaticMesh";

export class MainScene implements CreateSceneClass {
    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        const scene = new Scene(engine);
        let navigationPlugin = new RecastJSPlugin();
        navigationPlugin.setWorkerURL("https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/tools/playground/public/workers/navMeshWorker.js");
        scene.clearColor = new Color4(1.0, 1.0, 1.0, 1.0) //scene background color
        const camera = new ArcRotateCamera(
            "camera",
            2.13,
            Math.PI / 3,
            200,
            new Vector3(0, 0, 0),
            scene
        );
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);
        scene.environmentTexture = new CubeTexture(environment, scene);
        new EnvironmentHelper({
            skyboxTexture: undefined,
            createGround: false
        }, scene)
        const light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            scene
        );
        light.intensity = 0.7;
        const importResult = await SceneLoader.ImportMeshAsync(
            "",
            "",
            mall,
            scene,
            undefined,
            ".glb"
        );

        await scene.debugLayer.show()
        createStaticMesh(scene)

        return scene;
    };
}

export default new MainScene();
