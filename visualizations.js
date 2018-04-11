
const sbox = d3.select('#sandbox');

const N = 15;
const scale = d3.scaleLinear().domain([0,N]).range([0,1]);
const color = d3.interpolateViridis;


const svg = sbox.append('svg').attr('width', 500).attr('height', 500);

const draw = function(data){
  var updated = svg.selectAll('g').data(data, d=>d);

  var entered = updated.enter().append('g').attr('transform', (d,i)=>`translate(0,${i*11})`);

  entered
    .append('rect')
    .attr('width', d=>50+d)
    .attr('height',10)
    .attr('fill', d=>color(scale(d)));

  var all = updated.merge(entered);

  all.transition().duration(200).ease(d3.easeQuadInOut).attr('transform', (d,i)=>`translate(0,${i*11})`);
};


let myData = d3.shuffle('0'.repeat(N).split('').map((d,i)=>i+1));
draw(myData);

setTimeout(()=>{
  console.log('timeout done')
  algorithms[1].run(myData, draw, 205);
}, 1000)