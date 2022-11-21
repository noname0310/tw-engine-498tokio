import { Component, PrefabConstructor, ReadonlyVector2, WritableVector2 } from "the-world-engine";
import { Vector2 } from "three/src/Three";

import { Mulberry32 } from "./Mulberry32";

export class ParticleEmitter extends Component {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private static readonly Particle = class Particle extends Component {
        public linearVelocity: Vector2 = new Vector2();
        public activeTime = 0;
        public lifeTime = 0;
        public prefab: PrefabConstructor|null = null;
        public emitter: ParticleEmitter|null = null;

        public update(): void {
            //update particle position
            const linearVelocity = this.linearVelocity;
            const position = this.gameObject.transform.position;
            position.x += linearVelocity.x * this.engine.time.deltaTime;
            position.y += linearVelocity.y * this.engine.time.deltaTime;

            const emitter = this.emitter!;

            //remove particle if it is dead
            if (this.activeTime + this.lifeTime < emitter._accumulatedTime) {
                if (this.prefab === emitter._prefab) {
                    this.gameObject.activeSelf = false;
                    emitter._objectPool.push(this);
                } else {
                    this.gameObject.destroy();
                }
                emitter._activeParticles -= 1;
            }
        }
    };

    private _prefab: PrefabConstructor|null = null;
    private readonly _objectPool: InstanceType<typeof ParticleEmitter.Particle>[] = [];
    private _activeParticles = 0;
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

        //spawn particles
        if (this._prefab) {
            const particleCount = this._particleCount;
            for (let i = this._activeParticles; i <= particleCount; i++) {
                const particle = this.createParticle(this._prefab);

                const velocityNoiseScale = this._velocityNoiseScale;
                const linearVelocity = particle.linearVelocity.copy(this._linearVelocity);
                linearVelocity.x += (this._randomGenerator.next() - 0.5) * velocityNoiseScale;
                linearVelocity.y += (this._randomGenerator.next() - 0.5) * velocityNoiseScale;

                const lifeTimeNoiseScale = this._lifetimeNoiseScale;
                particle.lifeTime = this._lifeTime + (this._randomGenerator.next() - 0.5) * lifeTimeNoiseScale;

                this._activeParticles += 1;
            }
        }
    }

    private _patticleNextId = 0;

    private createParticle(prefab: PrefabConstructor): InstanceType<typeof ParticleEmitter.Particle> {
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

        const particle = gameObject.addComponent(ParticleEmitter.Particle)!;
        particle.emitter = this;
        particle.prefab = prefab;
        particle.activeTime = this._accumulatedTime;
        return particle;
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
