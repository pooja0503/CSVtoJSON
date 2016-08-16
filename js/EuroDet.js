var margin = {top: 100, right: 40, bottom: 80, left: 100},
  width = 1000 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangePoints([0,width]),
    y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis().scale(y)
  .orient("left");

var color=d3.scale.category10().range(["blue","red","green"]);
var valueline = d3.svg.line()
  .x(function(d) { return x(d.country_name); })
  .y(function(d) { return y(d.consumption); });

var svg = d3.select("body")
  .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
  .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   svg.append("text")
     .attr("x", (width / 2))
     .attr("y",0- margin.top/2)
     .attr("text-anchor", "middle")
     .style("font-size", "30px")
     .style("font-family","Algerian")
     .text("Countries vs Fat, Protein and Carbohydrate Consumption");

  svg.append("text")
      .attr("x",500 )
      .attr("y",  500 )
      .style("text-anchor", "middle")
      .style("font-size", "30px")
      .style("font-family","Aerial")
      .text("Countries");

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x",0 - (height / 2))
      .attr("y",0-(margin.left))
      .attr("dy", "1em")
      .style("font-size", "30px")
      .style("text-anchor", "middle")
      .style("font-family","Aerial")
      .text("Fat, Protein & Carbohydrate Consumption");

// Get the data
d3.json("../NodeJS/europeCountryConsumption.json", function(error, data) {
 var xDomain=[];
     xDomain.push("");
 data.forEach(function(d) {
      d.Region=d.Region;
      xDomain.push(d.Region);
      d.FatConsumption = parseInt(d.FatConsumption);
      d.CarboConsumption = parseInt(d.CarboConsumption);
      d.ProteinConsumption =parseInt(d.ProteinConsumption);
  });
  color.domain(d3.keys(data[0]).filter(function(key){return key !== "Region";}));

  var interData = color.domain().map(function (name) {
      console.log(name);
      return {
          name :name,
          values:data.map(function(d){
            return {country_name:d.Region,consumption:+d[name]};
          })
        };
     });

  // Scale the range of the data

  x.domain(xDomain);
  y.domain([0, d3.max(interData, function(d) { return d3.max(d.values,function(v){return v.consumption;}); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  var result = svg.selectAll(".lines")
      .data(interData).enter()
      .append("g")
      .attr("class","lines");

  // Add the valueline path.
  result.append("path")
          .attr("class", "line")
          .attr("d", function(d){return valueline(d.values);})
          .style("stroke",function(d){return color(d.name)});
          console.log(data[2].FatConsumption);

svg.append("text")
  .attr("transform", "translate(" + (width-40) + "," + y(data[2].FatConsumption) + ")")
  .attr("dy", ".35em")
  .attr("text-anchor", "end")
  .style("font-size","16px")
  .style("fill", "blue")
  .text("Fat");

svg.append("text")
  .attr("transform", "translate(" + (width-45) + "," + y(data[2].CarboConsumption) + ")")
  .attr("dy", ".35em")
  .attr("text-anchor", "start")
  .style("fill", "green")
  .style("font-size","16px")
  .text("Carbohydrate");

svg.append("text")
  .attr("transform", "translate(" + (width-10) + "," + y(data[2].ProteinConsumption) + ")")
  .attr("dy", ".35em")
  .attr("text-anchor", "start")
  .style("fill", "red")
  .style("font-size","16px")
  .text("Protein");
});
