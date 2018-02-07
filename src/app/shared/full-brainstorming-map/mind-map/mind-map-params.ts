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
  constructor (params: IParams = {}) {
    Object.assign(this, params);
  }

  public animationDuration = 0;
  public closeAnimationDuration = 0;
  public circleRadius = 60;
  public maxRadiusMultiplier = 2.3;
  public minRadiusMultiplier = 1;
  public triangleMultiplier = 1.3;
  public dragCircle = 6;
  public dragBorder = 3;
  public maxCharacters = 85;
  public positionMultiplier = 2.5;
  public fontSize = 16;
  public maxFontSizeMultiplier = 1;
  public minFontSizeMultiplier = (1 / 2.3);
  public maxBranches = 5;
  public maxDepth = 5;
  public maxScale = 1.7;
  public minScale = 0.2;

  get maxFontSize (): number {
    return this.fontSize * this.maxFontSizeMultiplier;
  }
  get minFontSize (): number {
    return this.fontSize * this.minFontSizeMultiplier;
  }
  get maxRadius (): number {
    return this.circleRadius * this.maxRadiusMultiplier;
  }
  get minRadius (): number {
    return this.circleRadius * this.minRadiusMultiplier;
  }
}
