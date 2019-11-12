// @TODO: YOUR CODE HERE!

var svgWidth = parseInt(d3.select("#scatter").style("width"));
var svgHeight = 0.75 * svgWidth;
var margin = 20;

console.log(margin);
var labels = 100;
var textBot = 40;
var textLeft = 40; 

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class","chart");
  
var circleRadius;
	function crGet(){
		if (svgWidth <= 530){
			circleRadius = 5	
		}
		else{
		circleRadius = 10;
		}
	}
	crGet();
	
// Bottom Axix
//-------------
 
svg.append("g").attr ("class","Xtext");
var Xtext = d3.select(".Xtext");

function XtextRefresh() {
  Xtext.attr(
    "transform",
    "translate(" +
      ((svgWidth - labels) / 2 + labels) +", " +
      (svgHeight - margin - textBot) +
      ")"
  );
}
	XtextRefresh();
	
Xtext
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "X")
  .attr("class", "aText active X")
  .text("In Poverty (%)");
  
//Left Axix	
//------------
var lefttextX = margin + textLeft;
var lefttextY = (svgHeight + labels) / 2 - labels;
svg.append("g").attr("class", "Ytext");

var Ytext = d3.select(".Ytext");
	function YtextRefresh() {
		Ytext.attr(
			"transform",
			"translate(" + lefttextX + ", " + lefttextY + ")rotate(-90)"
				);
	}
	YtextRefresh();
// Now we append the text.

Ytext
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "Y")
  .attr("class", "aText active y")
  .text("Obese (%)");

// call data

d3.csv("assets/data/data.csv").then(function(News)
	{
    Visualize(News);
	});	
	
function Visualize(data){
	
	var X = "poverty";
	var Y = "obesity";
	
	
	var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      // X key
      var theX;
      // Grab the state name.
      var theState = "<div>" + d.state + "</div>";
      // Snatch the y value's key and value.
      var theY = "<div>" + Y + ": " + d[Y] + "%</div>";
      // If the x key is poverty
      if (X === "poverty") {
        // Grab the x key and a version of the value formatted to show percentage
        theX = "<div>" + X + ": " + d[X] + "%</div>";
      }
      else {
		   theX = "<div>" +
          X +
          ": " +
          parseFloat(d[X]).toLocaleString("en") +
          "</div>";
      }
      // Display what we capture.
      return theState + theX + theY;
    });
  // Call the toolTip function.
  svg.call(toolTip);
	
	 
	var xminValue = d3.min(data, d => parseFloat (d[X])*0.9);
	var xmaxValue = d3.max(data, d => parseFloat (d[X])*1.1);
	console.log(xminValue);
	console.log(xmaxValue);
	var xScale = d3.scaleLinear()
		.domain([xminValue,xmaxValue])
		.range([margin + labels, svgWidth - margin ]);
		

		
	var yminValue = d3.min(data, d => parseFloat (d[Y])*0.9);
	var ymaxValue = d3.max(data, d => parseFloat (d[Y])*1.1);
	console.log(yminValue);
	console.log(ymaxValue);
		
	var yScale = d3.scaleLinear()
		.domain([yminValue,ymaxValue])
		.range([svgHeight - margin - labels, margin]);


// Step 7: Create the axes
  // =================================
	var bottomAxis = d3.axisBottom(xScale);
	var leftAxis = d3.axisLeft(yScale);
	
	//function tickCount(bottomAxis,leftAxis) {
		if (svgWidth <= 500) {
      bottomAxis.ticks(5);
      leftAxis.ticks(5);
		}
		else {
      bottomAxis.ticks(10);
      leftAxis.ticks(10);
		}
	//
//tickCount(bottomAxis,leftAxis);

// Step 8: Append the axes to the chartGroup
  // ==============================================
  
	svg
    .append("g")
    .call(bottomAxis)
    .attr("class", "bottomAxis")
    .attr("transform", "translate(0," + (svgHeight - margin - labels) + ")");
	svg
    .append("g")
    .call(leftAxis)
    .attr("class", "leftAxis")
    .attr("transform", "translate(" + (margin + labels) + ", 0)");
  
	
	var bubbles =  svg.selectAll("g").data(data).enter();
   
	bubbles
		.append("circle")
		.attr("cx",d => xScale(parseFloat(d[X])))
		.attr("cy",d => yScale(parseFloat(d[Y])))
		.attr("r", circleRadius )
		.attr("class", function(d) {
				return "stateCircle " + d.abbr;
			})
		.on("mouseover", function(d) {
      // Show the tooltip
      toolTip.show(d, this);
      // Highlight the state circle's border
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      // Remove the tooltip
      toolTip.hide(d);
      // Remove highlight
      d3.select(this).style("stroke", "#e3e3e3");
    });
	
	
  //  state abbreviations in bubbles
  
	bubbles
		.append("text")
		.text(function(d) {
				return d.abbr;
			})
		.attr("dx", function(d) {
				return xScale(d[X]);
			})
		.attr("dy", function(d) {
				return yScale(d[Y]) + circleRadius / 2.5;
			})
		.attr("font-size", circleRadius)
		.attr("class", "stateText")
		.on("mouseover", function(d) {
			toolTip.show(d);
      
			d3.select("." + d.abbr).style("stroke", "#323232");
			})
		.on("mouseout", function(d) {
			toolTip.hide(d);
      // Remove highlight
			d3.select("." + d.abbr).style("stroke", "#e3e3e3");
				});

	
// screen resolution adaptability
//-------------------------------
	
d3.select(window).on("resize", resize);

	function resize() {
    
		svgWidth = parseInt(d3.select("#scatter").style("width"));
		svgHeight = svgWidth - svgWidth / 3.9;
		lefttextY = (svgHeight + labels) / 2 - labels;

		svg.attr("width", svgWidth).attr("height", svgWeight);
	
		xScale.range([margin + labels, svgWidth - margin]);
		yScale.range([svgHeight - margin - labels, margin]);

    
		svg
			.select(".bottomAxis")
			.call(bottomAxis)
			.attr("transform", "translate(0," + (svgHeight - margin - labels) + ")");

		svg.select(".leftAxis").call(leftAxis);

    // Update the labels.
		XtextRefresh();
		YtextRefresh();

    // Update the radius of each dot.
		crGet();

    // With the axis changed, let's update the location and radius of the state circles.
    
		d3
			.selectAll("circle")
			.attr("cy", function(d) {
				return yScale(d[Y]);
				})
			.attr("cx", function(d) {
				return xScale(d[X]);
				})
			.attr("r", function() {
				return circleRadius;
			});

    // We need change the location and size of the state texts, too.
		d3
			.selectAll(".stateText")
			.attr("dy", function(d) {
				return yScale(d[Y]) + circleRadius / 3;
			})
			.attr("dx", function(d) {
				return xScale(d[X]);
			})
			.attr("r", circleRadius / 3);
	
	}
}