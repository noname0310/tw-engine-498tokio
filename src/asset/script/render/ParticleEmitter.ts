import { Vector2 } from "three/src/Three";
import { Component, GameObject, PrefabConstructor } from "the-world-engine";

export class ParticleEmitter extends Component {
    private _prefab: PrefabConstructor|null = null;
    private _objectPool: GameObject[] = [];
    private _linearVelocity = new Vector2();

    public
}
