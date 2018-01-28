import {MindMapParams} from "./mind-map-params";
import * as d3 from "d3";
import {MindMap} from "./mind-map";

export class MindMapHelper {

  constructor(private map: MindMap, private params: MindMapParams) {
  }

  getParent(parentId, node) {
    return node.node_id === parentId ? node : this.findInChildren(node.children, parentId);
  }

  link(d) {
    return `M${d.source.x},${d.source.y}C${(d.source.x + d.target.x) / 2},${d.source.y} ${(d.source.x + d.target.x) / 2},${d.target.y} ${d.target.x},${d.target.y}`;
  }

  getNewRadius(radius, shape) {
    let newRadius = radius > this.params.maxRadius
      ? shape === 'triangle'
        ? this.params.maxRadius * this.params.triangleMultiplier
        : this.params.maxRadius
      : radius;
    newRadius = newRadius < this.params.minRadius ? this.params.minRadius : newRadius;
    return newRadius;
  }

  autoScale(canvas, zoomFunc) {
    const box = canvas.select('.gmind').node().getBBox();
    const gmindHeight = box.height;
    const gmindWidth = box.width;
    const zoomPadding = 0.9;

    const zoom2 = Math.min(
        this.map.canvasWidth/gmindWidth,
        this.map.canvasHeight/gmindHeight
      ) * zoomPadding;

    const x = Math.abs(box.x) * zoom2 + this.map.canvasWidth / 2 - box.width * zoom2 / 2;
    const y = Math.abs(box.y) * zoom2 + this.map.canvasHeight / 2 - box.height * zoom2 / 2;

    const transform = d3.zoomIdentity
      .translate(x , y)
      .scale(zoom2);

    canvas.call(zoomFunc.transform, transform);
  }

  getTextScaleFn() {
    return d3
      .scaleLinear()
      .domain([0, this.params.maxCharacters])
      .range([this.params.minRadius, this.params.maxRadius])
  }

  private findInChildren(children, parentId) {
    let parent = null;

    if (Array.isArray(children)) {
      children.some((child) => {
        if (child.node_id === parentId) {
          parent = child;
        }
        return !!parent
      });

      if (!parent) {
        children.some(child => {
          const result = this.findInChildren(child.children, parentId)
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
