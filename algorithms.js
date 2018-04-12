
//once we have the stack of operations to perform & display,
  //we run through them with the given delay
function run(data, draw, stack, delay){
  setTimeout(()=>{
    if (stack.length > 0){
      let nextOperation = stack.shift();
      if (nextOperation.method === "swap"){
        swap(data, nextOperation.i, nextOperation.j);
        draw(data);
      }
      run(data, draw, stack, delay);
    }
  }, delay);
}


//helper function used in many sorting algorithms
function swap(data, i , j){
  let temp = data[i];
  data[i] = data[j];
  data[j] = temp;
}



//SORTING ALGORITHMS BELOW -------

function bubbleSort(data, draw, delay){
  const stack = [];
  let dataCopy = [...data];

  for(let i = 1; i < dataCopy.length; i++){
    for (let j = 0; j < i; j++){
      stack.push({method: "compare", i,j});
      if (dataCopy[i] < dataCopy[j]){
        stack.push({method: "swap", i,j});
        swap(dataCopy, i,j);
      }
    }
  }

  run(data, draw, stack, delay);
}

function insertionSort(data, draw, delay){
  const stack = [];
  let dataCopy = [...data];

  let i = 1;
  while(i < dataCopy.length){
    j = i;
    while(j > 0){
      stack.push({method:"compare", i:j-1, j});
      if (dataCopy[j-1] < dataCopy[j]) break;
      stack.push({method:"swap", i:j-1, j});
      swap(dataCopy, j-1, j);
      j--;
    }
    i++;
  }

  run(data, draw, stack, delay);
}

function quickSort(data, draw, delay){
  const stack = [];
  let dataCopy = [...data];

  let sort = function(low, high){
    if (high - low <= 1) return;

    pivot = high - 1;

    for (let i = low; i < pivot; i++){
      stack.push({method:"compare", i, j:pivot});
      if (dataCopy[i] > dataCopy[pivot]){
        stack.push({method:"swap", i, j:pivot-1});
        swap(dataCopy, i, pivot-1);
        stack.push({method:"swap", i:pivot-1, j:pivot});
        swap(dataCopy, pivot-1, pivot);
        pivot--;
        i--;
      }
    }

    sort(low, pivot);
    sort(pivot + 1, high);
  };

  sort(0, dataCopy.length);

  run(data, draw, stack, delay);
}


const algorithms = {insertionSort, bubbleSort, quickSort}

