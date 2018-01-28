import {Observable} from "rxjs/Observable";
import * as d3 from "d3";
import {MindMapParams} from "./mind-map-params";
import {MindMapHelper} from "./mind-map-helper";
import {MindMapShapes} from "./mind-map-shapes";
import {Subject} from "rxjs/Subject";

export class MindMap {
  canvasWidth: number;
  canvasHeight: number;
  chosenNode: any;
  canvas: any;

  private params: MindMapParams;
  private helper: MindMapHelper;
  private shapesHelper: MindMapShapes;
  private eventObservable: Subject<string>;
  private originalData: any[];
  private descendants: any;
  private links: any;
  private setData: any;
  private hierarchyData: any;
  private gMind: any;
  private scrubber: any;
  private gNodeItems: any;
  private originalId = 0;
  private soundId = 0;

  private rerender() {
    this.render();
    this.update([0, 0]);
  }

  private render() {
    this.setData = d3
      .tree()
      .size([360, 120])
      .separation((a, b) => {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      });

    this.hierarchyData = d3.hierarchy(this.originalData);

    this.hierarchyData
      .descendants()
      .forEach((descendant, dataAndEvents) => {
        descendant.data.closed = "true" == descendant.data.closed;
      });

    this.gMind = this.canvas.select(".gmind");

    if (this.gMind.empty()) {
      this.gMind = this.canvas.append("g").attr("class", "gmind");
    }
    this.scrubber = this.gMind.select(".glink");
    if (this.scrubber.empty()) {
      this.scrubber = this.gMind.append("g").attr("class", "glink");
    }
    this.gNodeItems = this.gMind.select(".gnode");
    if (this.gNodeItems.empty()) {
      this.gNodeItems = this.gMind.append("g").attr("class", "gnode");
    }

    const zoomFunc = d3
      .zoom()
      .scaleExtent([this.params.minScale, this.params.maxScale])
      .on("zoom", (e) => {
        const h = "scale(" + d3.event.transform.k + ")";
        const y = "translate(" + d3.event.transform.x + "," + d3.event.transform.y + ")";
        this.gMind.attr("transform", y + h);
      });

    setTimeout(()=> {
      this.helper.autoScale(this.canvas, zoomFunc);
    }, 10);

    this.canvas.call(zoomFunc);
  }

  private draw(ctx, event) {
    const theta2 = (ctx - 90) / 180 * Math.PI;

    return [event * Math.cos(theta2), event * Math.sin(theta2)];
  }

  private update(position) {

    this.setData(this.hierarchyData);

    this.descendants = this.hierarchyData.descendants();

    this.links = this.hierarchyData.links();

    this.descendants.forEach((descendant, i) => {
      descendant.y = 120 * descendant.depth;
      descendant.pos = this.draw(descendant.x, descendant.y);

      if (!descendant.id) {
        descendant.id = this.originalId;
        this.originalId++;
      }
    });

    this.links.forEach((link, i) => {
      if (!link.id) {
        link.id = this.soundId;
        this.soundId++;
      }
    });

    const conf = this.gNodeItems
      .selectAll(".node")
      .data(this.descendants, (ignores)  => ignores.id);

    const wrapEnter = conf.enter();
    const pointer = conf.exit();

    const map = this;

    const node = wrapEnter
      .append("g")
      .attr("class", "node")
      .attr("transform", (dataAndEvents) => {
        return "translate(" + position[0]  + "," + position[1]  + ")";
      })
      .on("mousedown", function(e) {

        if (!d3.event.defaultPrevented) {
          e.chosen = typeof e.chosen !== 'undefined' ? e.chosen : true;

          const color = e.chosen ? 'blue' : '';
          const border = e.chosen ? 4 : 0;
          const dragHelper = e.chosen ? 1 : 0;
          map.chosenNode = e.chosen ? e : null;

          node
            .select(".shape")
            .style('stroke', '')
            .style("stroke-width", 0);

          node
            .select('.drag-helper')
            .style('opacity', 0);

          d3
            .select(this)
            .select(".shape")
            .style('stroke', color)
            .style("stroke-width", border);

          d3
            .select(this)
            .select('.drag-helper')
            .style('opacity', dragHelper);

          const currentShape = d3
            .select(this)
            .select(".shape")
            .attr('class')
            .split(' ')[1]
            .split('-')[1];

          if (map.eventObservable) {
            map.eventObservable.next(currentShape)
          }

        }
      })
      .on("mouseover", function(dataAndEvents) {
        d3
          .select(this)
          .style("cursor", "pointer")
          .select("text")
          .style("fill-opacity", 1);
      })
      .on("mouseout", function(dataAndEvents) {
        d3
          .select(this)
          .select("text")
          .transition()
          .duration(map.params.animationDuration);

      });

    const shapeWrapper = node
      .append("g")
      .attr("class", "shape-wrapper")
      .append("g");

    const textScaleFn = this.helper.getTextScaleFn();

    shapeWrapper
      .each(function(d, i) {
        let initialRadius = d.data.radius ? d.data.radius : textScaleFn(d.data.name.length);
        // let initialRadius = d.data.radius ? d.data.radius : this.helper.getTextScaleFn()(d.data.name.length);
        const currentEl = d3.select(this);
        switch(d.depth) {
          case 0: {
            map.shapesHelper.setRect(currentEl, initialRadius);
            break;
          }
          case 1: {
            map.shapesHelper.setCircle(currentEl, initialRadius);
            break;
          }
          case 2: {
            map.shapesHelper.setHexagon(currentEl, initialRadius);
            break;
          }
          case 3: {
            map.shapesHelper.setTriangle(currentEl, initialRadius);
            break;
          }
          case 4: {
            map.shapesHelper.setStar(currentEl, initialRadius);
            break;
          }
          case 5: {
            map.shapesHelper.setPentagon(currentEl, initialRadius);
            break;
          }
        }
        map.shapesHelper.setDragHelper(currentEl, d, initialRadius);
      });

    node.append("foreignObject")
      .attr("width", map.params.circleRadius * 2)
      .attr("height", map.params.circleRadius * 2)
      .attr("transform", function(dataAndEvents) {
        return "translate(" + -(map.params.circleRadius) + "," + - (map.params.circleRadius) + ")";
      })
      .append("xhtml:body")
      .html(function(item) {
        return item.data.name;
      })
      .attr('fs',map.params.fontSize)
      .style("font", `${map.params.fontSize}px 'Tahoma'`)
      .style("color", "white")
      .style("height", "100%")
      .style("margin", "0")
      .style("padding", "10%")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("align-items", "center")
      .style("background", "transparent")
      .style("text-align", "center");

    const group = node
      .merge(conf)
      .transition()
      .duration(map.params.animationDuration)
      .attr("transform", function(propData) {
        return "translate(" + propData.pos[0] * map.params.positionMultiplier + "," + propData.pos[1] * map.params.positionMultiplier + ")";
      });

    const layer = pointer
      .transition()
      .duration(map.params.closeAnimationDuration)
      .attr("transform", function(dataAndEvents) {
        return "translate(" + position[0] + "," + position[1] + ")";
      })
      .remove();

    const ret = this.scrubber
      .selectAll(".link")
      .data(this.links, function(evt) {
        return evt.target.id;
      });

    const files = ret.enter();

    const args = ret.exit();

    files
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "rgba(20,20,20,0.2)")
      .attr("stroke-width", 20)
      .attr("opacity", 0)
      .attr("d", function(dataAndEvents) {
        const self = {
          x : position[0] * map.params.positionMultiplier,
          y : position[1] * map.params.positionMultiplier
        };
        return map.helper.link({
          source : self,
          target : self
        });
      })
      .merge(ret)
      .transition()
      .duration(map.params.animationDuration)
      .attr("opacity", 1)
      .attr("d", function(e) {
        const c = {
          x : e.source.pos[0] * map.params.positionMultiplier,
          y : e.source.pos[1] * map.params.positionMultiplier
        };
        const d = {
          x : e.target.pos[0] * map.params.positionMultiplier,
          y : e.target.pos[1] * map.params.positionMultiplier
        };
        return "M" + c.x + "," + c.y + "L" + d.x + "," + d.y;
      });

    args
      .transition()
      .duration(map.params.closeAnimationDuration)
      .attr("opacity", 0)
      .attr("d", function(dataAndEvents) {
        const c = {
          x : position[0],
          y : position[1]
        };
        const d = {
          x : position[0],
          y : position[1]
        };
        return "M" + c.x + "," + c.y + "L" + d.x + "," + d.y;
      })
      .remove();

    this.descendants
      .forEach(function(propData) {
        propData.prevPos = [propData.pos[0], propData.pos[1]];
      });


    const dragFn = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    shapeWrapper.call(dragFn);

    function dragstarted(d) {
      d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
      const currentShape = d3
        .select(this)
        .select(".shape")
        .attr('class')
        .split(' ')[1]
        .split('-')[1];


      const shape = d3
        .select(this)
        .select(".shape");

      const currentRadius = parseFloat(shape.attr('cR'));

      const newRadius = map.helper.getNewRadius(currentRadius + d3.event.dx, currentRadius);
      d3.event.subject.data.radius = newRadius;

      const body = d3
        .select(this.parentElement.parentElement)
        .select('foreignObject')
        .select('body');

      const currentFontSize = parseFloat(body.attr('fs'));

      const newFontSize = currentFontSize * newRadius / currentRadius;

      body
        .attr('fs',newFontSize)
        .style("font", `${newFontSize}px 'Tahoma'`);

      let data;

      switch (currentShape) {
        case 'rect': {
          shape
            .attr("width", newRadius * 2)
            .attr("height", newRadius * 2)
            .attr("transform",`translate(${-newRadius},${-newRadius})`);
          break;
        }
        case 'circle': {
          shape
            .attr("r", elem => newRadius);
          break;
        }
        case 'hexagon': {
          data = map.shapesHelper.getData(6, newRadius, 0);
          shape.attr('d', map.shapesHelper.lineFn()(data));
          break;
        }
        case 'triangle': {
          data = map.shapesHelper.getData(3, newRadius * 1.3, 30);
          shape.attr('d', map.shapesHelper.lineFn()(data));
          break;
        }
        case 'star': {
          data = map.shapesHelper.getData(12, newRadius, 30);
          shape.attr('d', map.shapesHelper.lineFn()(data));
          break;
        }
        case 'pentagon': {
          data = map.shapesHelper.getData(5, newRadius * 1.1, 45);
          shape.attr('d', map.shapesHelper.lineFn()(data));
          break;
        }
      }

      shape
        .attr('cR', newRadius);

      d3
        .select(this)
        .select(".drag-helper")
        .attr("transform", `translate(${newRadius},${newRadius})`
        );
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }
  }

  setEventObservable(observable) {
    this.eventObservable = observable;
  }

  init(id, width, height, data, params = {}) {
    this.canvas = d3
      .select(`#${id}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.canvasWidth = width;
    this.canvasHeight = height;

    this.originalData = data;

    this.params = new MindMapParams(params);
    this.helper = new MindMapHelper(this, this.params);
    this.shapesHelper = new MindMapShapes(this, this.params);

    this.rerender();
  }

  addNode(name) {
    const minNumber = 0;
    const maxNumber = 100;

    const child = {
      "name": name,
      "radius": 0,
      "children": [],
      "closed": false,
      "node_id": Math.floor(Math.random() * (maxNumber - minNumber)) + maxNumber
    };

    if (this.chosenNode.depth > this.params.maxDepth - 1) {
      alert(`${this.params.maxDepth} depth is maximum`);
      return;
    }

    const node_id = this.chosenNode.data.node_id;

    const parent = this.helper.getParent(node_id, this.originalData);

    if (!parent) { throw new Error(`Didn't find parent with id - ${node_id}; in array - ${self}`)}

    if (!parent.children) {
      parent.children = [child];
    } else if (parent.children.length < this.params.maxBranches) {
      parent.children.push(child);
    } else {
      alert(`${this.params.maxBranches} branches is maximum`);
      return;
    }

    this.rerender();
  }

}
