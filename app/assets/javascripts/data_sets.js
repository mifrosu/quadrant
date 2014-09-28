// Place all the behaviours and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


var ready = function() {
};

var chart;

nv.addGraph(function() {
  chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .useVoronoi(true)
                .color(d3.scale.category10().range())
                .transitionDuration(300)
                ;

  chart.xAxis.tickFormat(d3.format('.02f'));
  chart.yAxis.tickFormat(d3.format('.02f'));
  //chart.tooltipContent(function(key) {
  //    return '<h2>' + key + '</h2>';
  //});

  var data_objects = JSON.parse(d3.select('#quadrant_data').attr('data-items'));

  d3.select('#quadrant_data svg')
      //.datum(randomData(4,40))
      .datum(getData(data_objects))
      .call(chart);

  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });

  return chart;
});


function randomData(groups, points) { //# groups,# points per group
  var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

  for (i = 0; i < groups; i++) {
    data.push({
      key: 'Group ' + i,
      values: []
    });

    for (j = 0; j < points; j++) {
      data[i].values.push({
        x: random(),
        y: random(),
        size: Math.random(),
        shape: shapes[j % 6]
      });
    }
  }

  return data;
}

function getData(data_json) {
  var graphData = [];
  var data = [];
  var data_size = data_json.length;
  for (var i = 0; i < data_size; ++i) {
    data.push({
      x: data_json[i]['x_data'],
      y: data_json[i]['y_data'],
      size: data_json[i]['radius_data'],
      shape: 'circle'
    });
  }
  graphData.push({values: data, key: 'Data'});
  return graphData;
}


$(document).ready(ready);
$(document).on('page:load', ready);


