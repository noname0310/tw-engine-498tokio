import { Vector2 } from "three/src/Three";
import { Component, GameObject, PrefabConstructor, ReadonlyVector2, WritableVector2 } from "the-world-engine";
import { Mulberry32 } from "./Mulberry32";

class Particle {
    public gameObject: GameObject;
    public linearVelocity: Vector2 = new Vector2();
    public activeTime: number;
    public lifeTime = 0;
    public prefab: PrefabConstructor;

    public constructor(gameObject: GameObject, activeTime: number, prefab: PrefabConstructor) {
        this.gameObject = gameObject;
        this.activeTime = activeTime;
        this.prefab = prefab;
    }
}

export class ParticleEmitter extends Component {
    private _prefab: PrefabConstructor|null = null;
    private readonly _objectPool: Particle[] = [];
    private readonly _activeParticles: Particle[] = [];
    private readonly _linearVelocity = new Vector2();
    private _particleCount = 10;
    private _lifeTime = 5;
    private _accumulatedTime = 0;
    private _seed = 0;
    private _velocityNoiseScale = 0.5;
    private _lifetimeNoiseScale = 1;
    private _randomGenerator: Mulberry32 = new Mulberry32(0);

    public update(): void {
        this._accumulatedTime += this.engine.time.deltaTime;

        const activeParticles = this._activeParticles;

        //spawn particles
        if (this._prefab) {
            const particleCount = this._particleCount;
            for (let i = activeParticles.length; i <= particleCount; i++) {
                const particle = this.createParticle(this._prefab);

                const velocityNoiseScale = this._velocityNoiseScale;
                const linearVelocity = particle.linearVelocity.copy(this._linearVelocity);
                linearVelocity.x += (this._randomGenerator.next() - 0.5) * velocityNoiseScale;
                linearVelocity.y += (this._randomGenerator.next() - 0.5) * velocityNoiseScale;

                const lifeTimeNoiseScale = this._lifetimeNoiseScale;
                particle.lifeTime = this._lifeTime + (this._randomGenerator.next() - 0.5) * lifeTimeNoiseScale;

                activeParticles.push(particle);
            }
        }

        //update particles
        for (let i = 0; i < activeParticles.length; i++) {
            const particle = activeParticles[i];

            //update particle position
            const linearVelocity = particle.linearVelocity;
            const gameObject = particle.gameObject;
            const position = gameObject.transform.position;
            position.x += linearVelocity.x * this.engine.time.deltaTime;
            position.y += linearVelocity.y * this.engine.time.deltaTime;

            //remove particle if it is dead
            if (particle.activeTime + particle.lifeTime < this._accumulatedTime) {
                if (particle.prefab === this._prefab) {
                    particle.gameObject.activeSelf = false;
                    this._objectPool.push(particle);
                } else {
                    particle.gameObject.destroy();
                }
                activeParticles.splice(i, 1);
                i -= 1;
            }
        }
    }

    private _patticleNextId = 0;

    private createParticle(prefab: PrefabConstructor): Particle {
        if (0 < this._objectPool.length) {
            const particle = this._objectPool.pop()!;
            particle.gameObject.activeSelf = true;
            particle.gameObject.transform.position.copy(this.gameObject.transform.position);
            particle.activeTime = this._accumulatedTime;
            return particle;
        }

        const gameObject = this.engine.scene.addChildFromBuilder(
            this.engine.instantiater.buildPrefab(
                "particle_" + this._patticleNextId,
                prefab,
                this.gameObject.transform.position
            )
                .make()
        );

        this._patticleNextId += 1;

        return new Particle(gameObject, this._accumulatedTime, prefab);
    }

    public get prefab(): PrefabConstructor|null {
        return this._prefab;
    }

    public set prefab(prefab: PrefabConstructor|null) {
        this._prefab = prefab;
    }

    public get linearVelocity(): ReadonlyVector2 {
        return this._linearVelocity;
    }

    public set linearVelocity(vector2: ReadonlyVector2) {
        (this._linearVelocity as WritableVector2).copy(vector2);
    }

    public get particleCount(): number {
        return this._particleCount;
    }

    public set particleCount(count: number) {
        this._particleCount = count;
    }

    public get lifeTime(): number {
        return this._lifeTime;
    }

    public set lifeTime(lifeTime: number) {
        this._lifeTime = lifeTime;
    }

    public get seed(): number {
        return this._seed;
    }

    public set seed(seed: number) {
        this._seed = seed;
        this._randomGenerator = new Mulberry32(seed);
    }

    public get velocityNoiseScale(): number {
        return this._velocityNoiseScale;
    }

    public set velocityNoiseScale(scale: number) {
        this._velocityNoiseScale = scale;
    }

    public get lifetimeNoiseScale(): number {
        return this._lifetimeNoiseScale;
    }

    public set lifetimeNoiseScale(scale: number) {
        this._lifetimeNoiseScale = scale;
    }
}
