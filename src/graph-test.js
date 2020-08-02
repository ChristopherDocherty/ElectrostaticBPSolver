import React from 'react';
import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear} from '@vx/scale'
import { AreaClosed } from '@vx/shape'
import {Group} from '@vx/group'
import {extent, max} from 'd3-array'

function graph_test(){

    const data = appleStock;

    const width = 750;
    const height = 400;

    const margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 80,
    };
    
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.right;

    //These are accessors because they pull data out of a JSO
    const x = d => new Date(d.date);
    const y = d => d.close; 


    const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, x)
    });

    const yScale = scaleLinear({
        range: [yMax, 0], //I suppose this specifies teh value associated with y=0 according to the browser
        domain: [0,max(data,y)]
    });


    const chart = ( 
        <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>

                <AreaClosed
                    data={data}
                    yScale={yScale}
                    x={d => xScale(x(d))}
                    y={d => yScale(y(d))}
                    fill={"red"}
                />

            </Group>

        </svg>
    )





    
    return(
        chart
    )

}


export default graph_test;