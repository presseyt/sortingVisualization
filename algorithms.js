//Loops with a built in delay

const delayedForLoop = function(start, end, callback, complete, delay){
  //
  if (start < end) {
    callback(start, ()=> {
      setTimeout(()=>{
        delayedForLoop(++start, end, callback, complete, delay);
      }, delay);
    });
  } else {
    if(complete) complete();
  }
};

const delayedWhile = async function(callback, delay){
  //continues with the loop if callback return true
  var bool = await callback();
  if (bool){
    setTimeout(()=>delayedWhile(callback, delay), delay);
  }

};

//Utility Functions:
const swap = function(data, i, j){
  let temp = data[i];
  data[i] = data[j];
  data[j] = temp;

  draw(data);
};

//Sorting algorithms:

const bubbleSort = function(data, draw, delay){
  delayedForLoop(1, data.length, (i, callback1)=>{
    delayedForLoop(0, i, (j, callback2)=> {
      if (data[i] < data[j]){
        swap(data, i, j);
      }
      callback2();
    }, ()=> callback1(), delay);
  }, null, delay);
};


const insertionSort = function(data, draw, delay){
  let i = 1;
  delayedWhile( () => new Promise( resolve1 => {
    let j = i;

    delayedWhile(()=> new Promise (resolve2 => {
      if (j > 0 && data[j-1] < data[j]){
        swap(data, j-1, j);
        j--;
        resolve2 (true);
      } else {
        resolve1(++i < data.length);
      }
    }), delay);

  }), delay);
};


const algorithms = [
  {name:"Insertion Sort", run: insertionSort},
  {name:"Bubble Sort", run: bubbleSort}
]

