const mazeElement = document.getElementById("maze");
const popup = document.getElementById("memoryPopup");
const bgMusic = document.getElementById("bgMusic");

let player = { x: 1, y: 1 };
let collected = new Set();
const totalMemories = 5;

const maze = [
    "################",
    "#P....#M.......#",
    "#.#####.#####..#",
    "#..M..#...#....#",
    "###.#####.#.##.#",
    "#...#.....#..M##",
    "#.###.###.###..#",
    "#.#.....#...#.##",
    "#.#####.#.#.#..#",
    "#...#...#.#M##.#",
    "###.#.###.###..#",
    "#...#.....#....#",
    "#.###.######.###",
    "#..M......#...G#",
    "################"
];

const memories = {
    "7,1": { image: "images/Nu4.jpg", text: "Tụi mình dễ thươngggg 🫶" },
    "3,3": { image: "images/Nu1.JPG", text: "Bức ảnh chung đầu tiên của tụi mình" },
    "13,5": { image: "images/Nu7.jpg", text: "Awwwwwwwww 😚" },
    "11,9": { image: "images/Nu3.jpg", text: "Chính thức mập rõ >.<" },
    "3,13": { image: "images/Nu5.jpg", text: "Anh bị cuốn hút bởi bé từ khi nào không hay 🥹" }
};

const galleryImages = ["Nu1", "Nu2", "Nu3", "Nu4", "Nu5", "Nu6", "Nu7", "Nu8", "Nu9", "Nu11", "Nu12", "Nu13", "Nu14", "Nu15", "Nu16", "Nu17", "Nu30", "Nu50", "us2", "us3", "us4"];

// Chuyển màn hình
document.getElementById("startBtn").onclick = () => {
    document.getElementById("introScreen").classList.add("hidden");
    document.getElementById("musicScreen").classList.remove("hidden");
};

document.querySelectorAll(".musicBtn").forEach(btn => {
    btn.onclick = () => {
        bgMusic.src = btn.dataset.song;
        bgMusic.play();
        document.getElementById("musicScreen").classList.add("hidden");
        document.getElementById("rulesScreen").classList.remove("hidden");
    };
});

document.getElementById("startGameBtn").onclick = () => {
    document.getElementById("rulesScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    renderMaze();
};

function renderMaze() {
    mazeElement.innerHTML = "";
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            const cell = document.createElement("div");
            cell.className = "cell " + (maze[y][x] === "#" ? "wall" : "path");
            if (maze[y][x] === "M") cell.classList.add("memory");
            if (maze[y][x] === "G") cell.classList.add("goal");
            if (x === player.x && y === player.y) {
                const img = document.createElement("img");
                img.src = "assets/princess.png"; // Đảm bảo bạn có file này
                img.className = "sprite";
                cell.appendChild(img);
            }
            mazeElement.appendChild(cell);
        }
    }
}

function movePlayer(dx, dy) {
    if (!popup.classList.contains("hidden")) return;
    const nx = player.x + dx, ny = player.y + dy;
    if (maze[ny][nx] === "#") return;

    player.x = nx;
    player.y = ny;
    
    const key = `${nx},${ny}`;
    if (maze[ny][nx] === "M" && !collected.has(key)) {
        collected.add(key);
        document.getElementById("memoryCount").innerText = `${collected.size} / ${totalMemories}`;
        if (memories[key]) {
            document.getElementById("memoryImage").src = memories[key].image;
            document.getElementById("memoryText").innerText = memories[key].text;
            popup.classList.remove("hidden");
        }
    }

    if (maze[ny][nx] === "G" && collected.size === totalMemories) {
        document.getElementById("gameScreen").classList.add("hidden");
        document.getElementById("transitionScreen").classList.remove("hidden");
        setupGallery();
        setTimeout(() => {
            document.getElementById("transitionScreen").classList.add("hidden");
            document.getElementById("endingScreen").classList.remove("hidden");
        }, 2500);
    }
    renderMaze();
}

function setupGallery() {
    const container = document.querySelector(".gallery");
    container.innerHTML = "";
    [...galleryImages].sort(() => Math.random() - 0.5).forEach(name => {
        const img = document.createElement("img");
        img.src = `images/${name}.jpg`;
        img.onclick = () => {
            document.getElementById("modalImg").src = img.src;
            document.getElementById("imageModal").classList.remove("hidden");
        };
        container.appendChild(img);
    });
}

window.onkeydown = (e) => {
    if (e.key === "ArrowUp") movePlayer(0, -1);
    if (e.key === "ArrowDown") movePlayer(0, 1);
    if (e.key === "ArrowLeft") movePlayer(-1, 0);
    if (e.key === "ArrowRight") movePlayer(1, 0);
};

document.getElementById("closePopup").onclick = () => popup.classList.add("hidden");
document.getElementById("imageModal").onclick = () => document.getElementById("imageModal").classList.add("hidden");
document.getElementById("replayBtn").onclick = () => location.reload();
