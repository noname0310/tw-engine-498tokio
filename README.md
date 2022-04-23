# tw-engine-498tokio
![license: MIT](https://img.shields.io/github/license/noname0310/tw-engine-498tokio)
![version](https://img.shields.io/npm/v/tw-engine-498tokio)
![npm](https://img.shields.io/npm/dw/tw-engine-498tokio)

implementation of a keyframe animation for web game.

## about
- keyframe animation with audio sync
- use typescript for web
- this implementation can be used anywhere (not dependent on the game engine)

## [build](https://noname0310.github.io//tw-engine-498tokio/build/index.html)
![preview](docs/preview.png)
All animations in this project are rendered in CSS (do not use WebGL)
[reference: 498 Tokio](https://www.youtube.com/watch?v=-lHRRVnoE0Y)

## usage
for install,
```npm
npm i tw-engine-tokio
```



**first, you need `requestAnimationFrame` based player**

```typescript
import { IAnimationInstance } from "tw-engine-498tokio";

//simple animation player that use requestAnimationFrame
class AnimationPlayer {
    public frameRate = 60;
    private _startTime = 0;
    private _currentTime = 0;
    private _animationInstance: IAnimationInstance;

    public constructor(animationInstance: IAnimationInstance) {
        this._animationInstance = animationInstance;
    }

    public start() {
        this._startTime = performance.now();
        this._currentTime = 0;
        this.animate();
    }

    private animate = () => {
        const now = performance.now();
        const delta = now - this._startTime;
        this._currentTime += delta;
        const frameTime = this._currentTime * this.frameRate;
        this._animationInstance.process(frameTime);
        
        if (track1.endFrame < frameTime) {
            requestAnimationFrame(this.animate);
        }
    }
}
```

---
### Animation Track
`AnimationTrack` is the smallest unit of container that can store animation.
You can create an animation with the code below and bind it to the object you want.

```typescript
//define track that has scalar key
export const track1 = AnimationTrack.createScalarTrack([
    AnimationKey.createValueType(0, 0, InterpolationKind.Linear), //frame 0, value 0
    AnimationKey.createValueType(60, 1, InterpolationKind.Linear)  //frame 60, value 1
])

const div = document.getElementById("animated-div")!;

//create animation instance with bind info
const divAnimInstance = track1.createInstance(value => div.style.opacity = value.toString());

new AnimationPlayer(divAnimInstance).start();
```

---
### Animation Clip
`AnimationClip` is an animation container that contains several animation tracks. It's perfect for creating a little bit of a complicated animation.

```typescript
//animation clip can contain multiple tracks
const clip1 = new AnimationClip([
    {
        name: "track1" as const,
        // you can create AnimationTrack to use constructor, in this case, AnimationTrack need interpolator
        track: new AnimationTrack<number>([
            AnimationKey.createValueType(0, 0, InterpolationKind.Linear), //frame 0, value 0
            AnimationKey.createValueType(60, 1, InterpolationKind.Linear)  //frame 60, value 1
        ], ScalarInterpolator)
    },
    {
        name: "track2" as const,
        // this track use cubic hermite interpolation
        track: AnimationTrack.createScalarTrack([
            AnimationKey.createValueType(0, 0, InterpolationKind.Cubic, 0, 0), //frame 0, value 0
            AnimationKey.createValueType(60, 1, InterpolationKind.Cubic, 0, 0)  //frame 120, value 1
        ])
    }
])

const div1 = document.getElementById("animated-div1")!;
const div2 = document.getElementById("animated-div2")!;

const divAnimInstance = clip1.createInstance(new AnimationClipBindInfo([
    {
        trackName: "track1" as const,
        target: (value: number) => div1.style.opacity = value.toString()
    },
    {
        trackName: "track2" as const,
        target: (value: number) => div2.style.opacity = value.toString()
    }
]));

new AnimationPlayer(divAnimInstance).start();
```

---
### Animation Sequence
`AnimationSequence` can contain animation tracks, animation clips, and themselves recursively.
This container is optimized for use with very long animations over 3 minutes.

```typescript
//animation sequence can contain multiple animation clips, tracks and even them self
const sequence1 = new AnimationSequence([
    new RangedAnimation(track1),
    new RangedAnimation(clip1, 20, 1, 50), // RangedAnimation that offset 20, start frame 1, end frame 50
    new RangedAnimation(AnimationTrack.createVector2Track([
        //Vector2 is class so you must create key by createRefType
        AnimationKey.createRefType(0, new Vector2(0, 0), InterpolationKind.Linear), //frame 0, value 0, 0
        AnimationKey.createRefType(60, new Vector2(1, 1), InterpolationKind.Linear)  //frame 60, value 1, 1
    ]))
]);

const div1 = document.getElementById("animated-div1")!;
const div2 = document.getElementById("animated-div2")!;

const divAnimInstance = sequence1.createInstance([
    (value: number) => div1.style.opacity = value.toString(),
    new AnimationClipBindInfo([
        {
            trackName: "track1" as const,
            target: (value: number) => div2.style.opacity = value.toString()
        },
        {
            trackName: "track2" as const,
            target: (value: number) => div2.style.opacity = value.toString()
        }
    ]),
    (value: Vector2) => {
        div1.style.left = value.x.toString();
        div1.style.top = value.y.toString();
    }
]);

new AnimationPlayer(divAnimInstance).start();
```

## Credits

- [Babylon.js Animations](https://github.com/BabylonJS/Babylon.js/tree/master/packages/dev/core/src/Animations)
- [Three.js Animation](https://github.com/mrdoob/three.js/tree/dev/src/animation)
- [decode-audio-data-fast](https://github.com/soundcut/decode-audio-data-fast)