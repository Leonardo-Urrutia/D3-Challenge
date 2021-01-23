var svgArea = d3.select("#scatter").select("svg");


// SVG wrapper dimensions are determined by the current width and
// height of the browser window.
var svgWidth = 860;
var svgHeight = 800;

var margin = {
    top: 50,
    bottom: 80,
    right: 50,
    left: 80
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgHeight - margin.left - margin.right;

// Append SVG element
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append group element
var scatterGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function (censusData) {

    censusData.forEach(data => {
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
        data.poverty = +data.poverty;
        data.income = +data.income;
        data.age = +data.age;
    });

    console.log(censusData);

    var xAgeLinearScale = d3.scaleLinear()
        .domain(d3.extent(censusData, d => d.age))
        .range([0, width]);

    var ySmokeLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.smokes)])
        .range([height, 0]);

    var xAgeAxis = d3.axisBottom(xAgeLinearScale);
    var ySmokeAxis = d3.axisLeft(ySmokeLinearScale).ticks(10);

    // append axes
    scatterGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAgeAxis);

    scatterGroup.append("g")
        .call(ySmokeAxis);

    // Add dots
    var scatterDots = scatterGroup.append('g')
        .selectAll("dot")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xAgeLinearScale(d.age))
        .attr("cy", d => ySmokeLinearScale(d.smokes))
        .attr("r", 15)
        .style("fill", "#69b3a2")


    scatterGroup.selectAll("dot")
        .data(censusData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .text(d => d.abbr)
        .attr("x", d => xAgeLinearScale(d.age))
        .attr("y", d => ySmokeLinearScale(d.smokes - .22))
    

    // x axis title
    scatterGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .text("Age (Median)")
    .classed("aText", true)

    scatterGroup.append("text")
    // this rotation makes things weird!
    // x and y placements will seem transposed.
    .attr("transform", "rotate(-90)")
    .attr("x", 0-height/2)
    .attr("y", 0-margin.left)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .classed("atext", true)
    .text("Smokers (%)"); 
  
});