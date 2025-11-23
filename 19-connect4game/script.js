const grid = document.querySelector('.grid');

let rows = 6;
let cols = 7;
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.style.gridRow = row + 1;
    cell.style.gridColumn = col + 1;

    grid.appendChild(cell);
  }
}

let activeTurn =
  '-' + document.querySelector('.turn--color').textContent.toLowerCase();

function checkForWin(team) {
  const playerCells = [...document.querySelectorAll(`.cell.filled.${team}`)];
  if (playerCells.length < 4) return;

  const coords = new Set(
    playerCells.map((cell) => `${cell.dataset.row},${cell.dataset.col}`)
  );

  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const cell of playerCells) {
    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);
    for (const [dr, dc] of directions) {
      let count = 1;
      let rr = r;
      let cc = c;
      while (count < 4) {
        rr += dr;
        cc += dc;
        if (!coords.has(`${rr},${cc}`)) break;
        count++;
      }
      if (count === 4) {
        showWin(team);
        return;
      }
    }
  }
}

function showWin(team) {
  alert(`${team === '-red' ? 'Red' : 'Yellow'} wins!`);

  document
    .querySelectorAll('.cell')
    .forEach((cell) => cell.classList.remove('filled', '-red', '-yellow'));

  document.querySelector('.turn--color').textContent = 'Red';
  activeTurn = '-red';
}

document.querySelectorAll('.cell').forEach((cell) =>
  cell.addEventListener('click', (e) => {
    const curCol = e.target.dataset.col;

    const allCellsInCol = [...document.querySelectorAll('.cell')].filter(
      (cur) => cur.dataset.col === curCol
    );
    const filledCellsInCol = [...document.querySelectorAll('.cell')].filter(
      (cur) => cur.dataset.col === curCol && cur.classList.contains('filled')
    );

    if (filledCellsInCol && allCellsInCol) {
      const placedTeam = activeTurn;
      let num =
        filledCellsInCol.length === 0
          ? -1
          : filledCellsInCol.at(0).dataset.row - 1;

      allCellsInCol.at(num).classList.add('filled', placedTeam);

      document.querySelector('.turn--color').textContent =
        placedTeam === '-red' ? 'Yellow' : 'Red';
      activeTurn =
        '-' + document.querySelector('.turn--color').textContent.toLowerCase();
      checkForWin(placedTeam);
    }
  })
);
