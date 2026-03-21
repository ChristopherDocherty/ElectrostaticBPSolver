import React, { Component } from 'react';
import { Group } from '@vx/group';
import { scaleLinear } from '@vx/scale';
import {HeatmapRect } from '@vx/heatmap';




function heatmap_square(heatmap) {
    return heatmap.map(heatmapBins =>
        heatmapBins.map(bin => (
          <rect
            key={`heatmap-rect-${bin.row}-${bin.column}`}
            className="vx-heatmap-rect"
            width={bin.width}
            height={bin.height}
            x={bin.x}
            y={bin.y}
            fill={bin.color}
            fillOpacity={bin.opacity}
          >
          </rect>
        )),
      )
}


class Heatmap extends Component {



  render(){

    const cool1 = '#BBDEFB';
    const cool2 = '#0D47A1';

    const binData =this.props.binData;


    function max(data, value) {
      return Math.max(...data.map(value));
    }

    function min(data, value) {
      return Math.min(...data.map(value));
    }

    // accessors
    const bins = d => d.bins;
    const count = d => d.count;

    const colorMax = max(binData, d => max(bins(d), count)); //max over all rows and all cols
    const colorMin = min(binData, d => min(bins(d), count))
    const bucketSizeMax = max(binData, d => bins(d).length); //Number of rows

    let xScale = scaleLinear({
      domain: [0, binData.length],
      });
    let yScale = scaleLinear({
      domain: [bucketSizeMax,0],
      });
    let rectColorScale = scaleLinear({
      range: [cool1, cool2],
      domain: [colorMin, colorMax]});


    // bounds 
    const xMax = Math.round(this.props.width / 2) * 2;
    const yMax = Math.round(this.props.height / 2) * 2;

    const binWidth = xMax / binData.length;
    const binHeight = yMax / bucketSizeMax;
    
    xScale.range([0, xMax]);
    yScale.range([yMax, 0]);

    return this.props.width < 10 ? null : (
        <svg width={this.props.width} height={this.props.height}>
        <rect x={0} y={0} width={this.props.width} height={this.props.height} rx={14} fill={"#FFFFFF"}/>
          <Group>
            <HeatmapRect
              data={binData}
              xScale={xScale}
              yScale={yScale}
              colorScale={rectColorScale}
              binWidth={binWidth}
              binHeight={binHeight}
              gap={0}
            >
              {heatmap_square}
            </HeatmapRect>


          </Group>
        </svg>
    );
  }
};


export default Heatmap;