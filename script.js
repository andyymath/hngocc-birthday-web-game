const mazeElement = document.getElementById("maze");

const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");
const endingScreen = document.getElementById("endingScreen");
const transitionScreen = document.getElementById("transitionScreen");

const popup = document.getElementById("memoryPopup");

const popupImage = document.getElementById("memoryImage");
const popupText = document.getElementById("memoryText");

const memoryCount = document.getElementById("memoryCount");

const bgMusic = document.getElementById("bgMusic");

/* MAZE */

const maze = [

"################",
"#P....#........#",
"#.#####.#####..#",
"#..M..#...#....#",
"###.#####.#.##.#",
"#...#.....#..M##",
"#.#.#.###.###..#",
"#.#.....#...#.##",
"#.#####.#.#.#..#",
"#...#...#.#M##.#",
"###.#.###.###..#",
"#...#..M.....#.#",
"#.#########..#.#",
"#..M.........#G#",
"################"

];

/* PLAYER */

let player = {
  x: 1,
  y: 1
};

let collectedMemories = [];

/* MEMORIES */

const memories = {

  "3,3": {
    image: "images/Nu1.jpg",
    text: "The first memory ✨"
  },

  "13,5": {
    image: "images/Nu2.jpg",
    text: "One of my favorite days with you."
  },

  "11,9": {
    image: "images/Nu3.jpg",
    text: "Still makes me smile every time."
  },

  "7,11": {
    image: "images/Nu4.jpg",
    text: "A tiny moment I never forgot."
  },

  "3,13": {
    image: "images/Nu5.jpg",
    text: "And somehow every path led to you ❤️"
  }

};

/* RENDER */

function renderMaze() {

  mazeElement.innerHTML = "";

  for (let y = 0; y < maze.length; y++) {

    for (let x = 0; x < maze[y].length; x++) {

      const cell = document.createElement("div");

      cell.classList.add("cell");

      const value = maze[y][x];

      /* WALL / PATH */

      if (value === "#") {
        cell.classList.add("wall");
      } else {
        cell.classList.add("path");
      }

      /* PLAYER */

      if (x === player.x && y === player.y) {

        cell.classList.add("player");

        const img = document.createElement("img");

        img.src = "assets/princess.png";

        img.classList.add("sprite");

        cell.appendChild(img);
      }

      /* GOAL */

      if (value === "G") {

        cell.classList.add("goal");

        const goalImg = document.createElement("img");

        goalImg.src = "assets/goal.png";

        goalImg.classList.add("sprite");

        cell.appendChild(goalImg);
      }

      /* MEMORY */

      if (
        value === "M" &&
        !collectedMemories.includes(`${x},${y}`)
      ) {
        cell.classList.add("memory");
      }

      mazeElement.appendChild(cell);
    }
  }

  memoryCount.innerText =
    `${collectedMemories.length} / ${Object.keys(memories).length}`;
}

/* MOVE */

function movePlayer(dx, dy) {

  const newX = player.x + dx;
  const newY = player.y + dy;

  if (maze[newY][newX] === "#") return;

  player.x = newX;
  player.y = newY;

  checkInteractions();

  renderMaze();
}

/* INTERACTION */

function checkInteractions() {

  const tile = maze[player.y][player.x];

  const key = `${player.x},${player.y}`;

  /* MEMORY */

  if (
    tile === "M" &&
    !collectedMemories.includes(key)
  ) {

    collectedMemories.push(key);

    popup.classList.remove("hidden");

    popupImage.src = memories[key].image;

    popupText.innerText = memories[key].text;
  }

  /* GOAL */

  if (
    tile === "G" &&
    collectedMemories.length === Object.keys(memories).length
  ) {

    gameScreen.classList.add("hidden");

    transitionScreen.classList.remove("hidden");

    setTimeout(() => {

      transitionScreen.classList.add("hidden");

      endingScreen.classList.remove("hidden");

    }, 2500);
  }
}

/* KEYBOARD */

document.addEventListener("keydown", (e) => {

  if (!popup.classList.contains("hidden")) {
    return;
  }

  if (e.key === "ArrowUp") {
    movePlayer(0, -1);
  }

  if (e.key === "ArrowDown") {
    movePlayer(0, 1);
  }

  if (e.key === "ArrowLeft") {
    movePlayer(-1, 0);
  }

  if (e.key === "ArrowRight") {
    movePlayer(1, 0);
  }

});

/* START */

document
  .getElementById("startBtn")
  .addEventListener("click", () => {

    introScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    bgMusic.play();

    renderMaze();
});

/* CLOSE POPUP */

document
  .getElementById("closePopup")
  .addEventListener("click", () => {

    popup.classList.add("hidden");
});

/* REPLAY */

document
  .getElementById("replayBtn")
  .addEventListener("click", () => {

    player.x = 1;
    player.y = 1;

    collectedMemories = [];

    endingScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    renderMaze();
});
