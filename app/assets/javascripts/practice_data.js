// Place all the behaviours and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var MOSPie = {
  makePie: function (svg_object, arc_object, color_scale, color_key, pie_data, trans_x, trans_y) {
    svg_object.append("g")
      .attr("transform", "translate(" + trans_x + "," + trans_y + ")")
      .selectAll("path")
      .data(pie_data)
      .enter()
      .append("path")
      .attr("d", arc_object)
      .style("fill", function(d) {
        return color_scale[d.data[color_key]];
        })
      .style("opacity", .75)
      .style("stroke", "white")
      .style("stroke-width", "2px");
  },
  getPieData: function (pie_object, data_hash, selector) {
    return pie_object(data_hash[selector].values);
  },
  makeColorScale: function(key_array) {
    // helper to return colour based on ID
    var color_scale = d3.scale.category20()
    var color_keys = {};
    key_array.forEach(function (e) {
      color_keys[e] = color_scale(e);
    });
    return color_keys;
  },
  makeStandardLegend: function() {
    var all_keys = $('#key-array').data("items");
    var legend = d3.select('#legend')
      .append('ul')
      .attr('class', 'legend-list');

    legend.selectAll("li")
      .data(all_keys)
      .enter()
      .append('li')
      .attr('class', 'key-item')
      .attr('id', function (d) {
        return "key-" + MOSPie.keyClassify(d);
      })
      .text(function(d) {
        return d;
      });
  },
  activateLegend: function (pie_data, color_scale, label_key) {
    var active_keys =  pie_data.map(function (item) {
      return item.data[label_key];
    });
    active_keys.forEach(function (e) {
      d3.select("li#key-" + MOSPie.keyClassify(e))
        .style("color", "black")
        .style("border-left-color", function (e) {
          return color_scale[e];
        });
    });
  },
  clearLegend: function () {
    d3.selectAll("ul.legend-list").remove();
  },
  keyClassify: function (str) {
    return str.replace(/\W+/g, '-').toLowerCase();
  }
};

var ready;
ready = function() {

  // define plot size
  var w = 800;
  var h = 300;

  if ($('#pie_practice_data').length > 0) {

    // get data as an array of objects
    var data_objects = JSON.parse(d3.select('#pie_practice_data').attr('data-items'));

    // group data by month using d3.nest
    var data_by_month_array = d3.nest()
      .key(function(d) { return d.month})
      .entries(data_objects);

    // get totals for each subset, add them as object attributes
    data_by_month_array.forEach(function (e) {
      e.total_value = d3.sum(e.values, function (d) {
        return d.value;
      });
      e.total_count = d3.sum(e.values, function (d) {
        return d.count;
      });
    });

    // put the data into an associative array
    var data_by_month = {}
    data_by_month_array.forEach(function(item){
      data_by_month[item["key"]] = item;
    });

    // declare pie charts
    var pie_count_chart = d3.layout.pie();
    pie_count_chart.value(function(d) {
      return d.count;
    });

    var pie_value_chart = d3.layout.pie();
    pie_value_chart.value(function(d) {
      return d.value;
    });

    var month = d3.select("#month_selector").node().value;

    var count_data = MOSPie.getPieData(pie_count_chart, data_by_month, month);
    var value_data = MOSPie.getPieData(pie_value_chart, data_by_month, month);

    // create the path tags for arcs
    var arc = d3.svg.arc();
    arc.outerRadius(100);


    // create the SVG element
    var svg = d3.select('#pie_practice_data')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    var all_keys = $('#key-array').data("items");
    var color_scale = MOSPie.makeColorScale(all_keys);

    MOSPie.makePie(svg, arc, color_scale, "practice", count_data, 150, 150);
    MOSPie.makePie(svg, arc, color_scale, "practice", value_data, 450, 150);
    MOSPie.makeStandardLegend();
    MOSPie.activateLegend(count_data, color_scale, "practice");

    $("#month_selector").change(function() {
      var month = $(this).find('option:selected').attr('value');
      var count_data = MOSPie.getPieData(pie_count_chart, data_by_month, month);
      var value_data = MOSPie.getPieData(pie_value_chart, data_by_month, month);
      svg.selectAll("path").remove();
      MOSPie.makePie(svg, arc, color_scale, "practice", count_data, 150, 150);
      MOSPie.makePie(svg, arc, color_scale, "practice", value_data, 450, 150);
      MOSPie.clearLegend();
      MOSPie.makeStandardLegend();
      MOSPie.activateLegend(count_data, color_scale, "practice");
    });
  }

};


$(document).ready(ready);
$(document).on('page:load', ready);



