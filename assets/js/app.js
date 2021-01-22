var svgArea = d3.select("#scatter").select("svg");


// SVG wrapper dimensions are determined by the current width and
// height of the browser window.
var svgWidth = 800;
var svgHeight = 800;

var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
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
    var ySmokeAxis = d3.axisLeft(ySmokeLinearScale).ticks(6);

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
        .attr("r", 7.5)
        .style("fill", "#69b3a2")
});