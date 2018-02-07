import {
  MindMapParams
} from './mind-map-params';
import {
  MindMap
} from './mind-map';
import * as d3 from 'd3';

export class MindMapHelper {
  constructor (
    private map: MindMap,
    private params: MindMapParams
  ) {}

  public getParent (parentId, node): any {
    return node.node_id === parentId ? node : this.findInChildren(node.children, parentId);
  }

  public link (d): any {
    return `M${d.source.x},${d.source.y}C${(d.source.x + d.target.x) / 2},${d.source.y} ${(d.source.x + d.target.x) / 2},${d.target.y} ${d.target.x},${d.target.y}`; // tslint:disable:max-line-length
  }

  public getNewRadius (radius, shape): any {
    let newRadius = radius > this.params.maxRadius
      ? shape === 'triangle'
        ? this.params.maxRadius * this.params.triangleMultiplier
        : this.params.maxRadius
      : radius;
    newRadius = newRadius < this.params.minRadius ? this.params.minRadius : newRadius;
    return newRadius;
  }

  public autoScale (canvas, zoomFunc): void {
    const box = canvas.select('.gmind').node().getBBox();
    const gmindHeight = box.height;
    const gmindWidth = box.width;
    const zoomPadding = 0.9;

    const zoom2 = Math.min(
      this.map.canvasWidth / gmindWidth,
      this.map.canvasHeight / gmindHeight
    ) * zoomPadding;

    const x = Math.abs(box.x) * zoom2 + this.map.canvasWidth / 2 - box.width * zoom2 / 2;
    const y = Math.abs(box.y) * zoom2 + this.map.canvasHeight / 2 - box.height * zoom2 / 2;

    const transform = d3.zoomIdentity
      .translate(x, y)
      .scale(zoom2);

    canvas.call(zoomFunc.transform, transform);
  }

  public getTextScaleFn (): any {
    return d3
      .scaleLinear()
      .domain([0, this.params.maxCharacters])
      .range([this.params.minRadius, this.params.maxRadius]);
  }

  private findInChildren (children, parentId): any {
    let parent = null;

    if (Array.isArray(children)) {
      children.some((child) => {
        if (child.node_id === parentId) {
          parent = child;
        }

        return !!parent;
      });

      if (!parent) {
        children.some(child => {
          const result = this.findInChildren(child.children, parentId);
          if (result) {
            parent = result;
            return true;
          } else {
            return false;
          }
        });
      }
    }

    return parent;
  }
}
