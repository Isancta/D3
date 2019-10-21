// @TODO: YOUR CODE HERE!

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
  
var svgWidth = 960;  
var svgHeight = 500;

var margin = {top: 60, right: 40, bottom: 77, left:150};


var innerWidth = svgWidth - margin.left - margin.right;
var innerHeight = svgHeight - margin.top - margin.bottom;

var chart = svg.append("g")
  .attr("transform", "translate(`${margin.left}`, `${margin.top}`)");

// call data

d3.csv("assets/data/data.csv").then(function(News)
	{
    Render(News);
	});	
	
function Render(HMdata){
	
var X = "poverty";
var Y = "obesity";
	 
var xminValue = d3.min(HMdata, d => parseFloat (d[X])*0.9);
var xmaxValue = d3.max(HMdata, d => parseFloat (d[X])*1.1);
var xScale = d3.scaleLinear()
		.domain([xminValue,xmaxValue])
		.range([0,innerWidth]);
		

		
var yminValue = d3.min(HMdata, d => parseFloat (d[Y])*0.9);
var ymaxValue = d3.max(HMdata, d => parseFloat (d[Y])*1.1);

		
var yScale = d3.scaleLinear()
		.domain([yminValue,ymaxValue])
		.range([0,innerHeight]);


// Step 7: Create the axes
  // =================================
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);
  

// Step 8: Append the axes to the chartGroup
  // ==============================================
  // Add x-axis
  chart.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)
    .call(bottomAxis);
	
  // Add y-axis
  chart.append("g")
	.call(leftAxis);
	
	
   var bubble =  chart.selectAll("g").data(HMdata).enter();
   
   bubble
   .append("circle")
   .attr("cx",d => xScale(xValue(d)))
   .Attr("cy",d => yScale(yValue(d)))
   .attr("r", 20)
   .attr("class", function(d) {
      return "stateCircle " + d.abbr;
   })
   . append("text")
   .text(function(d) {
      return d.abbr;
    });
	
	
};
	




	
	
	
	
	
	
		
	
		
	
			
	
	
	

