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

    var diff_x = x_max - x_min;
    var diff_y = y_max - y_min;

    var x_pad = 0.05 * diff_x;
    var y_pad = 0.05 * diff_y;

    var xScale = d3.scale.linear()
                   .domain([x_min - x_pad, x_max + x_pad ])
                   .range([padding, w - padding]);

    var yScale = d3.scale.linear()
                   .domain([y_min - y_pad, y_max + y_pad])
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
      .attr("fill", "steelblue")
      .attr("stroke", "#192E40");

    // create axes
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + yScale(0) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + xScale(0) + ",0)")
      .call(yAxis);

    // remove 0s from crossed axes
    svg.selectAll(".tick")
      .each(function (d, i) {
        if (d == 0) {
          this.remove();
        }
      });
  }

};

$(document).ready(ready);
$(document).on('page:load', ready);


