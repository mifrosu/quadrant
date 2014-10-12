// Place all the behaviours and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


var ready;
ready = function() {

  if ($('#quadrant_data').length > 0) {

    // get data as an array of objects
    var data_objects = JSON.parse(d3.select('#quadrant_data').attr('data-items'));

    // define plot size
    var w = 800;
    var h = 500;
    var padding = 40;

    // define scale
    var x_min = d3.min(data_objects, function(d) { return d['x_data']; });
    var x_max = d3.max(data_objects, function(d) { return d['x_data']; });
    var y_min = d3.min(data_objects, function(d) { return d['y_data']; });
    var y_max = d3.max(data_objects, function(d) { return d['y_data']; });
    var z_min = d3.min(data_objects, function(d) { return d['z_data']; });
    var z_max = d3.max(data_objects, function(d) { return d['z_data']; });

    var xScale = d3.scale.linear()
                   .domain([x_min, x_max])
                   .range([padding, w - padding]);

    var yScale = d3.scale.linear()
                   .domain([y_min, y_max])
                   .range([h - padding, padding]);

    var zScale = d3.scale.linear()
                   .domain([z_min, z_max])
                   .range([h/200, h/20]);
    // define axes
    var xAxis = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(10);

    var yAxis = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(10);

    // create SVG element
    var svg = d3.select('#quadrant_data')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    // append circles
    svg.append('g')
      .attr("id", "circles")
      .selectAll('circle')
      .data(data_objects)     // need this to return an array of hashes
      .enter()
      .append('circle')
      .attr("cx", function(d) {
        return xScale(d['x_data']);
      })
      .attr("cy", function(d) {
        return yScale(d['y_data']);
      })
      .attr("r", function(d) {
        return zScale(d['z_data']);
      })
      .attr("fill", "steelblue");

    // create axes
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (h - padding + 5) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (padding - 5) + ",0)")
      .call(yAxis);

    //nv.addGraph(function() {
    //  chart = nv.models.scatterChart()
    //                .showDistX(true)
    //                .showDistY(true)
    //                .useVoronoi(true)
    //                .color(d3.scale.category10().range())
    //                .transitionDuration(300)
    //                ;

    //  chart.xAxis.tickFormat(d3.format('.02f'));
    //  chart.yAxis.tickFormat(d3.format('.02f'));
    //  //chart.tooltipContent(function(key) {
    //  //    return '<h2>' + key + '</h2>';
    //  //});

    //  var data_objects = JSON.parse(d3.select('#quadrant_data').attr('data-items'));

    //  d3.select('#quadrant_data svg')
    //      //.datum(randomData(4,40))
    //      .datum(getData(data_objects))
    //      .call(chart);

    //  nv.utils.windowResize(chart.update);

    //  chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });

    //  return chart;
    //});
  }

};

function getData(data_json) {
  var graphData = [];
  var data = [];
  var data_size = data_json.length;
  for (var i = 0; i < data_size; ++i) {
    data.push({
      x: data_json[i]['x_data'],
      y: data_json[i]['y_data'],
      size: data_json[i]['z_data'],
      shape: 'circle'
    });
  }
  graphData.push({values: data, key: 'Data'});
  return graphData;
}

$(document).ready(ready);
$(document).on('page:load', ready);


