// @TODO: YOUR CODE HERE!
// 
d3.csv("assets/data/data.csv", function(error, News) {
  if (error) return console.warn(error);
    console.log(News);
	
  var svgWidth = 960;
var svgHeight = 500;

var margin = {top: 60, right: 40, bottom: 77, left:150};


var innerWidth = svgWidth - margin.left - margin.right;
var innerHeight = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
//var parseData = d3.parseFloat("%d-%b");
  
//News.forEach(d =>{
    //d.poverty = +d.poverty;
   // d.obesity = +d.obesity;
    
  //});

var xminValue = d3.min(News, d => parseFloat (d['poverty'])*0.9);
var xmaxValue = d3.max(News, d => parseFloat (d['poverty'])*1.1);
var xAxisLabel = 'Poverty(%)';
var xScale = d3.scaleLinear()
		.domain([xminValue,xmaxValue])
		.range([0,innerWidth]);
		
var yminValue = d3.min(News, d => parseFloat (d['obesity'])*0.9)
var ymaxValue = d3.max(News, d => parseFloat (d['obesity'])*1.1)
var yAxisLabel = 'Obesity (%)';			
var yScale = d3.Scalelinear()
		.domain([yminValue,ymaxValue])
		.range([0, innerHeight]);


// Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

// Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  // Add y-axis
  chart.append("g").call(leftAxis);
  chart.selectAll("g").data(News).enter();
}); 


	
	
	
	
	
	
		
	
		
	
			
	
	
	

