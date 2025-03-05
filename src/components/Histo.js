import React from "react";
import Plot from "react-plotly.js";

const Histogram = ({data, bins = 10 }) => {

    if (!data || data.length === 0) {
        return <p>No data available</p>;
      }
      
    const traces = [];
    data.forEach(trace => {
        traces.push({
            x: trace.x,
            y: trace.y,
            name:  trace.name,
            autobinx: false,
            histfunc: "sum",
            marker: {
                color: trace.color,
                line: { color: trace.color, width: 1 },
            },
            opacity: 0.5,
            type: "histogram",
            xbins: {
                start: Math.min(...trace.x),
                end: Math.max(...trace.x),
                size: (Math.max(...trace.x) - Math.min(...trace.x)) / bins,
            },
        });
    });

  const layout = {
    bargap: 0.05,
    bargroupgap: 0.2,
    barmode: "overlay",
    title: {
        text: "Results",
        font: { size: 24 }
    },
    xaxis: { 
        title: {
            text: "Averages" ,
            font: { size: 16 }
          },
        range: [Math.min(...traces.map(trace => Math.min(...trace.x))) * 0.9 , Math.max(...traces.map(trace => Math.max(...trace.x))) * 1.1]},
        showticklabels: true, 
        tickangle: -45, 
        showline: true,
        zeroline: true,
    yaxis: { 
        title: {
            text: "Count",
            font: { size: 16 }
          },
        showticklabels: true, 
        tickangle: -45, 
        showline: true,
        zeroline: true,
    },
    showlegend: true, 
    legend: {
      x: 1, 
      y: 1,
      font: { size: 14 }, 
    },
  };

  return <Plot data={traces} layout={layout} />;
};

export default Histogram;
