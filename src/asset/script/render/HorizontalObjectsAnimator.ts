import { Vector3 } from "three/src/Three";
import { Component, GameObject, PrefabConstructor } from "the-world-engine";

export class HorizontalObjectsAnimator extends Component {
    private _prefab: PrefabConstructor|null = null;
    private _spawnCount = 3;
    private _padding = 1;
    private _spawnedObjects: GameObject[] = [];
    private _gradient = 0;

    public awake(): void {
        this.updateSpawnedObjects(true);
    }

    private updateSpawnedObjects(rePosition: boolean, reSpawn = false): void {
        if (reSpawn) {
            for (let i = 0; i < this._spawnedObjects.length; i++) {
                this._spawnedObjects[i].destroy();
            }
            this._spawnedObjects.length = 0;
        }

        const spawnedObjects = this._spawnedObjects;
        if (spawnedObjects.length < this._spawnCount) {
            for (let i = spawnedObjects.length; i < this._spawnCount; i++) {
                const go = this.engine.scene.addChildFromBuilder(
                    this.engine.instantiater.buildPrefab(
                        "horizontal_animated_object_" + i,
                        this._prefab!,
                        new Vector3(i * this._padding, 0, 0),
                        undefined
                        //new Vector3()
                    ).make()
                );
                go.transform.setParent(this.gameObject.transform, false);
                this._spawnedObjects.push(go);
            }
        } else if (spawnedObjects.length > this._spawnCount) {
            for (let i = spawnedObjects.length - 1; i >= this._spawnCount; i--) {
                spawnedObjects[i].destroy();
            }
        }

        if (rePosition) {
            for (let i = 0; i < spawnedObjects.length; i++) {
                spawnedObjects[i].transform.localPosition.x = (i * this._padding + this._gradient) % (this._padding * this._spawnCount);
            }
        }
    }

    public get prefab(): PrefabConstructor|null {
        return this._prefab;
    }

    public set prefab(value: PrefabConstructor|null) {
        this._prefab = value;
        if (0 < this._spawnedObjects.length) {
            this.updateSpawnedObjects(false, true);
        }
    }

    public get spawnCount(): number {
        return this._spawnCount;
    }

    public set spawnCount(value: number) {
        this._spawnCount = value;
        if (0 < this._spawnedObjects.length) {
            this.updateSpawnedObjects(false);
        }
    }

    public get padding(): number {
        return this._padding;
    }

    public set padding(value: number) {
        this._padding = value;

        if (0 < this._spawnedObjects.length) {
            this.updateSpawnedObjects(true);
        }
    }

    public get gradient(): number {
        return this._gradient;
    }

    public set gradient(value: number) {
        const length = this._padding * this._spawnCount;
        value = length - value % length;
        this._gradient = value;

        if (0 < this._spawnedObjects.length) {
            this.updateSpawnedObjects(true);
        }
    }
}
