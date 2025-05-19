const arrayContainer = document.getElementById("array-container");
let array = [];
let arraySize = 15; // Default

function generateArray() {
  array = [];
  const container = document.querySelector(".array-container");
  container.innerHTML = ""; // Clear old bars

  const color = document.getElementById("barColor").value;

  for (let i = 0; i < arraySize; i++) {
    const value = Math.floor(Math.random() * 800) + 50;
    array.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.width = `${value}px`;
    bar.style.backgroundColor = color; // Apply selected color
    bar.textContent = value;
    container.appendChild(bar);
  }
}



async function sortHandler() {
  const algorithm = document.getElementById("algorithm").value;

  switch (algorithm) {
    case "merge":
      await mergeSort(array, 0, array.length - 1);
      break;
    case "quick":
      await quickSort(array, 0, array.length - 1);
      break;
    case "bubble":
      await bubbleSort(array);
      break;
    case "insertion":
      await insertionSort(array);
      break;
    case "selection":
      await selectionSort(array);
      break;
  }
}
 
async function bubbleSort(arr) {


  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        updateBar(j, arr[j]);
        updateBar(j + 1, arr[j + 1]);
        await sleep();
      }
    }
  }

}

async function selectionSort(arr) {


  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      updateBar(i, arr[i]);
      updateBar(minIndex, arr[minIndex]);
      await sleep();
    }
  }


}
 
async function quickSort(arr, low = 0, high = arr.length - 1) {


  if (low < high) {
    const pi = await partition(arr, low, high);
    await quickSort(arr, low, pi - 1);
    await quickSort(arr, pi + 1, high);
  }

}

async function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      updateBar(i, arr[i]);
      updateBar(j, arr[j]);
      await sleep();
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  updateBar(i + 1, arr[i + 1]);
  updateBar(high, arr[high]);
  await sleep();

  return i + 1;


}


async function insertionSort(arr) {


  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      updateBar(j + 1, arr[j + 1]); // Update visual
      await sleep();
      j--;
    }

    arr[j + 1] = key;
    updateBar(j + 1, key); // Final placement of key
    await sleep();
  }


}



async function mergeSort(arr, left, right) {


  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  }
}

async function merge(arr, left, mid, right) {
  let n1 = mid - left + 1;
  let n2 = right - mid;

  let L = [], R = [];

  for (let i = 0; i < n1; i++) L[i] = arr[left + i];
  for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

  let i = 0, j = 0, k = left;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    updateBar(k, arr[k]);
    await sleep();
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    updateBar(k, arr[k]);
    await sleep();
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    updateBar(k, arr[k]);
    await sleep();
    j++;
    k++;
  }

}

function updateSizeValue() {
  arraySize = parseInt(document.getElementById("size").value);
  document.getElementById("sizeValue").textContent = arraySize;
  generateArray(); // Automatically re-render when size changes
}


function updateBar(index, value) {
  const bars = document.querySelectorAll(".bar");
  bars[index].style.width = `${value}px`;
  bars[index].textContent = value;
}

function colorBar(index, color) {
  const bars = document.querySelectorAll(".bar");
  if (bars[index]) {
    bars[index].style.backgroundColor = color;
  }
}

function sleep(ms = 100) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function sleep() {
  const speed = document.getElementById("speed").value;
  return new Promise(resolve => setTimeout(resolve, speed === 'fast' ? 50 : 200));
}

window.onload = () => {
  generateArray();
};

