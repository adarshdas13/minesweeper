# 💣 JS Minesweeper

A classic Minesweeper web app built using **HTML5**, **CSS3**, and **Vanilla JavaScript**. 

---

## 🚀 Features

* **10x10 Grid:** 100 tiles total with 20 hidden bombs.
* **Randomized Board:** Each game layout is randomly generated on load.
* **Smart Scanning:** Calculates and displays adjacent bomb counts for safe tiles.
* **Cascade Expansion:** Recursive flood-fill automatically clears empty zero-bomb regions.
* **Flagging System:** Right-click to place/remove flags (🚩) and track remaining flags.
* **Dual Win System:** Win by correctly flagging all 20 bombs OR clearing all 80 empty tiles.

---

## 🎮 Controls

| Action | Control | Description |
| :--- | :--- | :--- |
| **Reveal Tile** | Left-Click | Uncovers numbers, expands zeros, or explodes bombs |
| **Flag/Unflag Tile** | Right-Click | Toggles flag marker (🚩) without context menu |

---

## 📁 File Structure

```text
├── index.html   # Main layout and grid container
├── style.css    # Tile grid styles, borders, and number colors
└── ReadMe.md