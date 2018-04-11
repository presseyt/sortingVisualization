//Loops with a built in delay

const delayedForLoop = function(start, end, callback, delay){
  //
  if (start < end) {
    callback(start);
    setTimeout(()=>{
      delayedForLoop(++start, end, callback, delay);
    }, delay);
  }
};

const delayedWhile = function(callback, delay){
  //continues with the loop if callback return true
  if (callback()){
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
  delayedForLoop(1, data.length, (i)=>{
    delayedForLoop(0, i, (j)=> {
      if (data[i] < data[j]){
        swap(data, i, j);
      }
    }, delay);
  }, delay);
};

const insertionSort = function(data, draw, delay){
  let i = 1;
  delayedWhile(()=> {
    let j = i;

    delayedWhile(()=>{
      if (j > 0 && data[j-1] < data[j]){
        swap(data, j-1, j);
        j--;
        return true;
      }
    }, delay);

    return (++i < data.length);
  }, delay);
};


const algorithms = [
  {name:"Insertion Sort", run: insertionSort},
  {name:"Bubble Sort", run: bubbleSort}
]