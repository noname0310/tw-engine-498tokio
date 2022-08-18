import { Vector2 } from "three/src/Three";
import { AnimationClipBindInfo } from "../../script/animation/AnimationClipBindInfo";
import { ScalarHermiteInterpolator } from "../../script/animation/AnimationInterpolator";
import { AnimationClip } from "../../script/animation/container/AnimationClip";
import { AnimationSequence, RangedAnimation } from "../../script/animation/container/AnimationSequence";
import { AnimationTrack } from "../../script/animation/container/AnimationTrack";
import { IAnimationInstance } from "../../script/animation/instance/IAniamtionInstance";
import { AnimationKey, InterpolationKind } from "../../script/animation/key/AnimationKey";

//define track that has scalar key
export const track1 = AnimationTrack.createScalarTrack([
    new AnimationKey(0, 0, InterpolationKind.Linear), //frame 0, value 0
    new AnimationKey(60, 1, InterpolationKind.Linear)  //frame 60, value 1
])

const div = document.getElementById("animated-div")!;

//create animation instance with bind info
const divAnimInstance = track1.createInstance(value => div.style.opacity = value.toString());

//simple animation player that use requestAnimationFrame
class AnimationPlayer {
    public frameRate = 60;
    private _time = 0;
    private _currentTime = 0;
    private _animationInstance: IAnimationInstance;

    public constructor(animationInstance: IAnimationInstance) {
        this._animationInstance = animationInstance;
    }

    public start() {
        this._time = performance.now();
        this._currentTime = 0;
        this.animate();
    }

    private animate = () => {
        const now = performance.now();
        const delta = now - this._time;
        this._time = now;
        this._currentTime += delta;
        const frameTime = this._currentTime * this.frameRate;
        this._animationInstance.process(frameTime);
        
        if (track1.endFrame < frameTime) {
            requestAnimationFrame(this.animate);
        }
    }
}

new AnimationPlayer(divAnimInstance).start();

//animation clip can contain multiple tracks
const clip1 = new AnimationClip([
    {
        name: "track1" as const,
        // you can create AnimationTrack to use constructor, in this case, AnimationTrack need interpolator
        track: AnimationTrack.createTrack([
            new AnimationKey(0, 0, InterpolationKind.Linear), //frame 0, value 0
            new AnimationKey(60, 1, InterpolationKind.Linear)  //frame 60, value 1
        ], ScalarHermiteInterpolator)
    },
    {
        name: "track2" as const,
        // this track use cubic hermite interpolation
        track: AnimationTrack.createScalarTrack([
            new AnimationKey(0, 0, InterpolationKind.Cubic, 0, 0), //frame 0, value 0
            new AnimationKey(60, 1, InterpolationKind.Cubic, 0, 0)  //frame 120, value 1
        ])
    }
])

{

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

}

//animation sequence can contain multiple animation clips and tracks
const sequence1 = new AnimationSequence([
    new RangedAnimation(track1),
    new RangedAnimation(clip1, 20, 1, 50), // RangedAnimation that offset 20, start frame 1, end frame 50
    new RangedAnimation(AnimationTrack.createVector2Track([
        //Vector2 is class so you must create key by createRefType
        new AnimationKey(0, new Vector2(0, 0), InterpolationKind.Linear), //frame 0, value 0, 0
        new AnimationKey(60, new Vector2(1, 1), InterpolationKind.Linear)  //frame 60, value 1, 1
    ]))
]);

const div1 = document.getElementById("animated-div1")!;
const div2 = document.getElementById("animated-div2")!;

{

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

}