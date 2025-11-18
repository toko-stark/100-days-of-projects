const sizeInput = document.getElementById('size');
const speedInput = document.getElementById('speed');
const sortingType = document.getElementById('algorithm');

const sortingArea = document.querySelector('.sortingArea');
const sortBtn = document.querySelector('.sort');

const createBars = (count = sizeInput.value) => {
  let barAmount;
  if (typeof count !== 'number') {
    barAmount = Number(sizeInput.value) || 50;
  }

  console.log(barAmount);

  if (sortingArea.innerHTML.length !== 0) sortingArea.innerHTML = '';

  for (let i = 0; i < barAmount; i++) {
    const randomHight = Math.floor(Math.random() * 300) + 'px';
    const html = `<div class="bar bar--${i}" style="height: ${randomHight}"></div></div>`;
    sortingArea.insertAdjacentHTML('beforeend', html);
  }
};

const sortBars = async () => {
  const bars = [...sortingArea.children];
  const heights = bars.map((b) => parseInt(b.style.height));
  const delayBetween = Number(speedInput.value) || 50;

  const waitTick = () => new Promise((res) => setTimeout(res, delayBetween));
  const updateBars = (arr) =>
    arr.forEach((h, i) => {
      bars[i].style.height = h + 'px';
    });

  const bubbleSort = async (a) => {
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          updateBars(a);
        }
        await waitTick();
      }
    }
  };

  const selectionSort = async (a) => {
    for (let i = 0; i < a.length; i++) {
      let min = i;
      for (let j = i + 1; j < a.length; j++) {
        if (a[j] < a[min]) min = j;
        await waitTick();
      }
      if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]];
        updateBars(a);
        await waitTick();
      }
    }
  };

  const insertionSort = async (a) => {
    for (let i = 1; i < a.length; i++) {
      let key = a[i],
        j = i - 1;
      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        j--;
        updateBars(a);
        await waitTick();
      }
      a[j + 1] = key;
      updateBars(a);
      await waitTick();
    }
  };

  const mergeSort = async (a, l = 0, r = a.length - 1) => {
    if (l >= r) return;
    const m = (l + r) >> 1;
    await mergeSort(a, l, m);
    await mergeSort(a, m + 1, r);
    const temp = [];
    let i = l,
      j = m + 1;
    while (i <= m && j <= r) temp.push(a[i] <= a[j] ? a[i++] : a[j++]);
    while (i <= m) temp.push(a[i++]);
    while (j <= r) temp.push(a[j++]);
    for (let k = 0; k < temp.length; k++) a[l + k] = temp[k];
    updateBars(a);
    await waitTick();
  };

  const quickSort = async (a, l = 0, r = a.length - 1) => {
    if (l >= r) return;
    const pivot = a[(l + r) >> 1];
    let i = l,
      j = r;
    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        updateBars(a);
        await waitTick();
        i++;
        j--;
      }
    }
    if (l < j) await quickSort(a, l, j);
    if (i < r) await quickSort(a, i, r);
  };

  switch (sortingType.value) {
    case 'bubble':
      await bubbleSort(heights);
      break;
    case 'selection':
      await selectionSort(heights);
      break;
    case 'insertion':
      await insertionSort(heights);
      break;
    case 'merge':
      await mergeSort(heights);
      break;
    case 'quick':
      await quickSort(heights);
      break;
    default:
      return;
  }
};

sortBtn.addEventListener('click', sortBars);
sizeInput.addEventListener('change', createBars);

// Init
createBars();
