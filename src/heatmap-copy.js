import React from 'react';
import { Group } from '@vx/group';
import genBins from '@vx/mock-data/lib/generators/genBins';
import { scaleLinear } from '@vx/scale';
import {HeatmapRect } from '@vx/heatmap';

import test_arr from './test_arr.json';


const cool1 = '#122549';
const cool2 = '#b4fbde';
export const background = '#28272c';

const binData = test_arr.data_lst;


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

// scales
const xScale = scaleLinear({
  domain: [0, binData.length],
});
const yScale = scaleLinear({
  domain: [bucketSizeMax,0],
});
const rectColorScale = scaleLinear({
  range: [cool1, cool2],
  domain: [colorMin, colorMax],
});
const opacityScale = scaleLinear({
  range: [0.1, 1],
  domain: [colorMin, colorMax],
});




function heatmap_square(heatmap) {
    const events=true;
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
            onClick={() => {
              if (!events) return;
              const { row, column } = bin;
              alert(JSON.stringify({ row, column, bin: bin.bin }));
            }}
          >
          </rect>
        )),
      )
}


function heatmap_copy()  {

    const height = 1000;
    const width = 1000;
    const margin = { top: 10, left: 20, right: 20, bottom: 110 };
    const separation = 20;

  // bounds
  const size =
    width > margin.left + margin.right ? width - margin.left - margin.right - separation : width;
  const xMax = size;
  const yMax = height - margin.bottom - margin.top;

  const binWidth = xMax / binData.length;

  xScale.range([0, xMax]);
  yScale.range([yMax, 0]);


  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill={background} />
      <Group top={margin.top} left={margin.left}>
        <HeatmapRect
          data={binData}
          xScale={xScale}
          yScale={yScale}
          colorScale={rectColorScale}
          opacityScale={opacityScale}
          binWidth={binWidth}
          binHeight={binWidth}
          gap={0.25}
        >
          { heatmap_square}
        </HeatmapRect>


      </Group>
    </svg>
  );
};


export default heatmap_copy;