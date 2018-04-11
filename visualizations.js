
const sbox = d3.select('#sandbox');

const N = 15;
const scale = d3.scaleLinear().domain([0,N]).range([0,1]);
const color = d3.interpolateViridis;


const select = sbox.append('select')
                     .attr('id', 'sortAlgorithm')
                     .on('change', (d,i,nodes) => {
                        startVisualization(algorithms[nodes[0].value]);
                      });

select.append('option')
  .attr('value', 'bubbleSort')
  .text('Bubble Sort');
select.append('option')
  .attr('value', 'insertionSort')
  .text('Insertion Sort');
select.append('option')
  .attr('value', 'quickSort')
  .text('Quick Sort');

const svg = sbox.append('svg').attr('width', 500).attr('height', 500);


const draw = function(data){
  var updated = svg.selectAll('g').data(data, d=>d.type+d.v);

  var entered = updated.enter().append('g').attr('transform', (d,i)=>`translate(0,${i*11})`);


  entered
      .append('rect')
      .attr('width', d=>50+d.v)
      .attr('height',10)
      .attr('fill', d=>color(scale(d.v)));

  var all = updated.merge(entered);

  all.transition().duration(100).ease(d3.easeQuadInOut).attr('transform', (d,i)=>`translate(0,${i*11})`);
};


function startVisualization(sortFn){

  let myData = d3.shuffle('0'.repeat(N).split('').map((d,i)=>{return {type: "data", v:i+1}}));
  draw(myData);

  setTimeout(()=>{
    sortFn(myData, draw, 105);
  }, 200);

}

startVisualization(algorithms.bubbleSort);






