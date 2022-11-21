import { Component } from "the-world-engine";

import { IAnimationInstance } from "./animation/instance/IAniamtionInstance";

export class RuntimeAimationContainer extends Component {
    public animationInstance: IAnimationInstance|null = null;
}
