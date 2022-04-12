import { AnimationEventBindInfo } from "../key/AnimationEventKey";
import { AnimationEventTrack, EventTrackData, InferedEventTrackBindData } from "../container/AnimationEventTrack";
import { IAnimationInstance } from "./IAniamtionInstance";

export class AnimationEventTrackInstance<T extends EventTrackData, U extends InferedEventTrackBindData<T>> implements IAnimationInstance {
    private _bindInfo: U;

    private _currentFrameIndex: number;
    private _lastInvokedFrameIndex: number;
    private readonly _animationTrack: AnimationEventTrack<T, U>;
    private _noRestoreEvent: boolean;

    public constructor(animationTrack: AnimationEventTrack<T, U>, bindInfo: U) {
        this._bindInfo = { ...bindInfo };
        this._animationTrack = animationTrack;
        this._currentFrameIndex = 0;
        this._lastInvokedFrameIndex = -1;

        this._noRestoreEvent = true;
        for (const key in bindInfo) {
            if (bindInfo[key].eventRestore) {
                this._noRestoreEvent = false;
                break;
            }
        }
    }

    public get bindInfo(): U {
        return this._bindInfo;
    }

    public set bindInfo(bindInfo: U) {
        this._bindInfo = { ...bindInfo };

        this._noRestoreEvent = true;
        for (const key in bindInfo) {
            if (bindInfo[key].eventRestore) {
                this._noRestoreEvent = false;
                break;
            }
        }
    }

    public frameIndexHint(frameIndex: number): void {
        this._currentFrameIndex = frameIndex < 0 ? 0 : frameIndex;
    }

    public process(frameTime: number): void {
        const keys = this._animationTrack.keys;

        if (keys.length === 0) return;
        if (keys.length === 1) {
            if (this._lastInvokedFrameIndex < frameTime) {
                ((this._bindInfo as {[key: string]: AnimationEventBindInfo})[keys[0].eventName as string] as AnimationEventBindInfo).event();
                this._lastInvokedFrameIndex = frameTime;
            } else if (this._lastInvokedFrameIndex > frameTime) {
                ((this._bindInfo as {[key: string]: AnimationEventBindInfo})[keys[0].eventName as string] as AnimationEventBindInfo).eventRestore?.();
                this._lastInvokedFrameIndex = -1;
            }
            // if last invoked frame is same as current frame, do nothing
            return;
        }

        let startKeyIndex = this._currentFrameIndex;

        if (frameTime < 0) frameTime = 0;

        if (2048 < keys.length && 540 < Math.abs(frameTime - keys[startKeyIndex].frame)) {
            // use binary search for large key count
            let min = 0;
            let max = keys.length - 1;
            while (min < max) {
                const mid = (min + max) >> 1;
                if (frameTime < keys[mid + 1].frame) {
                    max = mid;
                } else {
                    min = mid + 1;
                }
            }
            startKeyIndex = min;
        } else {
            while (0 < startKeyIndex && frameTime < keys[startKeyIndex].frame) startKeyIndex -= 1;
            while (startKeyIndex < keys.length - 1 && frameTime >= keys[startKeyIndex + 1].frame) startKeyIndex += 1;
        }

        this._currentFrameIndex = startKeyIndex;

        const invokeFrameIndex = (frameTime === 0 && 0 <= this._lastInvokedFrameIndex) ? -1 : startKeyIndex;

        for (let i = this._lastInvokedFrameIndex + 1; i <= invokeFrameIndex; i++) {
            const key = keys[i];
            ((this._bindInfo as {[key: string]: AnimationEventBindInfo})[key.eventName as string] as AnimationEventBindInfo).event();
        }

        if (!this._noRestoreEvent) {
            for (let i = this._lastInvokedFrameIndex; i > invokeFrameIndex; i--) {
                const key = keys[i];
                ((this._bindInfo as {[key: string]: AnimationEventBindInfo})[key.eventName as string] as AnimationEventBindInfo).eventRestore?.();
            }
        }

        this._lastInvokedFrameIndex = invokeFrameIndex;
    }
}
