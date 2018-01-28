import * as d3 from "d3";
import {MindMapParams} from "./mind-map-params";
import {MindMap} from "./mind-map";

export class MindMapShapes {

  private colors = [
    '#631A8F',
    '#FF5A00',
    '#33B8F1',
    '#FC637F',
    '#25911A',
    '#1A8B8F'
  ];

  constructor(private map: MindMap, private params: MindMapParams) {
  }

  setRect(elem, radius) {
    elem
      .append("rect")
      .attr("class", "shape shape-rect")
      .attr('cR', radius)
      .attr("width", radius * 2)
      .attr("height", radius * 2)
      .style("fill", this.colors[0])
      .attr("transform","translate(" + -(radius) + "," + - (radius) + ")");
  }
  setCircle(elem, radius) {
    elem
      .append('circle')
      .attr("class", "shape shape-circle")
      .attr('cR', radius)
      .attr("r", radius)
      .style("fill", this.colors[1]);
  }

  setHexagon(elem, radius) {
    const data = this.getData(6, radius, 0);

    elem
      .append('path')
      .attr("class", "shape shape-hexagon")
      .attr('d', this.lineFn()(data))
      .attr('cR', radius)
      .attr('fill', this.colors[2])
      .attr("transform","translate(" + 0 + "," + - 0 + ")");
  }

  setTriangle(elem, radius) {
    const data = this.getData(3, radius * 1.3, 30);

    elem
      .append('path')
      .attr("class", "shape shape-triangle")
      .attr('cR', radius)
      .attr('d', this.lineFn()(data))
      .attr('fill', this.colors[3])
      .attr("transform","translate(" + 0 + "," + 10 + ")");
  }

  setStar(elem, radius) {
    const data = this.getData(12, radius, 30);

    elem
      .append('path')
      .attr("class", "shape shape-star")
      .attr('d', this.lineFn()(data))
      .attr('cR', radius * 1.3)
      .attr('fill', this.colors[4])
      .attr("transform","translate(" + 0 + "," + - 0 + ")");
  }

  setPentagon(elem, radius) {
    const data = this.getData(5, radius * 1.1, 45);

    elem
      .append('path')
      .attr("class", "shape shape-pentagon")
      .attr('d', this.lineFn()(data))
      .attr('cR', radius * 1.3)
      .attr('fill', this.colors[5])
      .attr("transform","translate(" + 0 + "," + - 0 + ")");
  }

  setDragHelper(elem, d, initialRadius) {
    const translateX = initialRadius;
    const translateY = d.depth !== 3 ? initialRadius : initialRadius * 0.8;

    elem
      .append('circle')
      .attr("class", "drag-helper")
      .attr("r", this.params.dragCircle)
      .style("fill", '#FFFFFF')
      .attr("transform","translate(" + (translateX) + "," + (translateY) + ")")
      .style('stroke', '#000000')
      .style("stroke-width", this.params.dragBorder)
      .style("opacity", '0');
  }

  getData(corners, radius, shift) {
    let data = [];
    for (let i = 0; i < corners; i++) {
      data.push(this.getCoords(corners, radius, i, shift))
    }
    data.push(this.getCoords(corners, radius, 0, shift));

    return data
  }

  lineFn() {
    return d3.line()
      .x(d => d['x'] * 1)
      .y(d => d['y'] * 1);
  }

  private getCoords(corners, R, i, shift = 0) {
    const angle = 360/corners;

    const radius = corners === 12
      ? !(i % 2)
        ? R
        : R / 1.45
      : R;

    return {
      x: Math.floor(radius * Math.cos(shift * Math.PI / 180 + angle * i * Math.PI / 180)),
      y: Math.floor(radius * Math.sin(shift * Math.PI / 180 + angle * i * Math.PI / 180))
    };
  }
}
