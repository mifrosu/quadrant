// Place all the behaviours and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

var MOSPie = {
  makePie: function (svg_object, arc_object, pie_data, trans_x, trans_y) {
    svg_object.append("g")
      .attr("transform", "translate(" + trans_x + "," + trans_y + ")")
      .selectAll("path")
      .data(pie_data)
      .enter()
      .append("path")
      .attr("d", arc_object)
      .style("fill", "blue")
      .style("opacity", .5)
      .style("stroke", "black")
      .style("stroke-width", "2px");
  },
  getPieData: function (pie_object, data_hash, selector) {
    return pie_object(data_hash[selector].values);
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
      console.log(d);
      return d.count;
    });

    var pie_value_chart = d3.layout.pie();
    pie_value_chart.value(function(d) {
      return d.value;
    });

    var month = d3.select("#month_selector").node().value;
    //d3.select("#month_selector").change(function(){
    //  alert($(this).find('option:selected').attr('rel'));
    //});

    //var count_data = pie_count_chart(data_by_month[month].values);
    //var value_data = pie_value_chart(data_by_month[month].values);
    var count_data = MOSPie.getPieData(pie_count_chart, data_by_month, month);
    var value_data = MOSPie.getPieData(pie_value_chart, data_by_month, month);
    var new_arc = d3.svg.arc();
    new_arc.outerRadius(100);

    // create the SVG element
    var svg = d3.select('#pie_practice_data')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    MOSPie.makePie(svg, new_arc, count_data, 150, 150);
    MOSPie.makePie(svg, new_arc, value_data, 450, 150);
    //svg.append("g")
    //  .attr("transform", "translate(150,150)")
    //  .selectAll("path")
    //  .data(count_data)
    //  .enter()
    //  .append("path")
    //  .attr("d", new_arc)
    //  .style("fill", "blue")
    //  .style("opacity", .5)
    //  .style("stroke", "black")
    //  .style("stroke-width", "2px");

    console.log(data_by_month);
    console.log(count_data);

    $("#month_selector").change(function() {
      var month = $(this).find('option:selected').attr('value');
      var count_data = MOSPie.getPieData(pie_count_chart, data_by_month, month);
      var value_data = MOSPie.getPieData(pie_value_chart, data_by_month, month);
      svg.selectAll("path").remove();
      MOSPie.makePie(svg, new_arc, count_data, 150, 150);
      MOSPie.makePie(svg, new_arc, value_data, 450, 150);
    });
  }

};


$(document).ready(ready);
$(document).on('page:load', ready);



