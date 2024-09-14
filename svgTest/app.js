window.onload = () => {
    draw();
}

function draw() {
    valuesArray = [30,20,10,40];

    const svg = document.getElementById("svg");


    svg.style.height = `${(window.innerWidth * 0.6) / 2}px`;
    svg.style.width = `${(window.innerWidth * 0.6) / 2}px`;

    const cx = svg.clientWidth / 2;
    const cy =  svg.clientHeight / 2;

    const radius = (window.innerWidth * 0.15) / 2;
    const outsideRadius = 75;
    
    for(i = 0; i < valuesArray.length; i++) {
        const points = calculatePoints(valuesArray, cx, cy, radius, outsideRadius, i);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.id = "path";
        svg.appendChild(path);
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        path.setAttribute("fill", `#${randomColor}`);
        path.setAttribute("stroke", `black`);
        path.setAttribute("stroke-width", "4");
        path.setAttribute("stroke-linejoin", "round")

        const largeArcFlag = (points.endAngle - points.startAngle > Math.PI) ? 1 : 0;
        
        const pathData = [
            `M ${points.x1} ${points.y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${points.x2} ${points.y2}`,
            `L ${points.l1} ${points.l2}`,
            `A ${radius + outsideRadius} ${radius + outsideRadius} 0 ${largeArcFlag} 0 ${points.x3} ${points.y3}`,
            `L ${points.l3} ${points.l4} `
        ].join(' ');

        path.setAttribute('d', pathData);
    }
}

function calculatePoints(valuesArray, cx, cy, radius, outsideRadius, i) {
    const radians = calulateRadians(valuesArray);

    let startAngle = 0;
    let endAngle = 0;

    let cumulativeValue = 0;

    for(j = -1; j < i; j++){
 
        startAngle = cumulativeValue; 
    
        cumulativeValue = cumulativeValue + radians[j + 1];
 
        endAngle = cumulativeValue;
    }

    const x1 = parseFloat(cx) + (radius * Math.cos(startAngle));
    const y1 = parseFloat(cy) + (radius * Math.sin(startAngle));
    const x2 = parseFloat(cx) + (radius * Math.cos(endAngle));
    const y2 = parseFloat(cy) + (radius * Math.sin(endAngle));

    const l1 = parseFloat(cx) + ((radius + outsideRadius) * Math.cos(endAngle));
    const l2 = parseFloat(cy) + ((radius + outsideRadius) * Math.sin(endAngle))
    
    const x3 = parseFloat(cx) + ((radius + outsideRadius) * Math.cos(startAngle));
    const y3 = parseFloat(cy) + ((radius + outsideRadius) * Math.sin(startAngle));

    const l3 = parseFloat(cx) + ((radius) * Math.cos(startAngle));
    const l4 = parseFloat(cy) + ((radius) * Math.sin(startAngle));

    return {startAngle, endAngle, x1, y1, x2, y2, l1, l2, x3, y3, l3, l4}
}

function calulateRadians(valuesArray) {
    const radians = [];

    valuesArray.forEach(e => {
        radians.push(e * (360/100) * (Math.PI/180));        
    });
    
    return radians 
}

// const path = document.getElementById("path");
// path.addEventListener("mouseover", myFuncition);
// function myFuncition(){
//     console.log("aølwidj")
// }

window.addEventListener("resize", () => {
    draw();
})