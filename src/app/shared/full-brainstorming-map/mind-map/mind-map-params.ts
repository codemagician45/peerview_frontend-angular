export interface IParams {
  animationDuration?: number;
  closeAnimationDuration?: number;
  circleRadius?: number;
  maxRadius?: number;
  maxRadiusMultiplier?: number;
  minRadius?: number;
  minRadiusMultiplier?: number;
  triangleMultiplier?: number;
  dragCircle?: number;
  dragBorder?: number;
  maxCharacters?: number;
  positionMultiplier?: number;
  fontSize?: number;
  maxFontSize?: number;
  maxFontSizeMultiplier?: number;
  minFontSize?: number;
  minFontSizeMultiplier?: number;
  maxBranches?: number;
  maxDepth?: number;
  maxScale?: number;
  minScale?: number;
}

export class MindMapParams {
  animationDuration = 0;
  closeAnimationDuration = 0;
  circleRadius = 60;
  maxRadiusMultiplier = 2.3;
  minRadiusMultiplier = 1;
  triangleMultiplier = 1.3;
  dragCircle = 6;
  dragBorder = 3;
  maxCharacters = 85;
  positionMultiplier = 2.5;
  fontSize = 16;
  maxFontSizeMultiplier = 1;
  minFontSizeMultiplier = (1 / 2.3);
  maxBranches = 5;
  maxDepth = 5;
  maxScale = 1.7;
  minScale = 0.2;

  constructor(params: IParams = {}) {
    Object.assign(this, params);
  }

  get maxFontSize() {
    return this.fontSize * this.maxFontSizeMultiplier;
  }
  get minFontSize() {
    return this.fontSize * this.minFontSizeMultiplier;
  }
  get maxRadius() {
    return this.circleRadius * this.maxRadiusMultiplier;
  }
  get minRadius() {
    return this.circleRadius * this.minRadiusMultiplier;
  }
}
