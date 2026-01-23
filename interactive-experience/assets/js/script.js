// ==============================
// Elements
// ==============================
const iframe = document.getElementById("preview");
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const resetBtn = document.getElementById("resetBtn");

// ==============================
// Default starter code
// ==============================
const defaultHTML = `
<div class="app">
    <h1>Welcome to the Chubby's Interactive Experience</h1>
    <p>Edit the code and watch it update instantly.</p>
	<button id="magicBtn">Click me</button>
    <p id="message">Try changing the HTML, CSS, or JS!</p>
</div>
<h2 style="text-align: center; color: var(--accent); font-size: 3rem">Challenges</h2>

<!--<div class="app">
  <div class="quiz">
    <div class="quiz__header">
      <h2>Module 1: jQuery Basics</h2>
      <p id="quizStatus">Question 1 of 3</p>
    </div>

    <div class="quiz__content" id="quizContent"></div>

    <div class="quiz__controls">
        <button id="backBtn" disabled>Back</button>
        <button id="nextBtn" disabled>Next</button>
    </div>
  </div>
</div> -->
`.trim();

const defaultCSS = `
:root {
  --bg: #0b1220;
  --card: #0f1a33;
  --text: #e7ecff;
  --muted: #9aa7c1;
  --accent: #7c3aed;
  --accent2: #22c55e;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
}

.app {
  max-width: 700px;
  margin: 40px auto;
  padding: 30px;
  background: var(--card);
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
}

.app__header h1 {
  margin: 0;
  font-size: 28px;
}

.app__header p {
  margin: 8px 0 0;
  color: var(--muted);
}

.app__content {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* ONLY affects buttons inside .app */
.app button {
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: var(--accent);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.app button:hover {
  filter: brightness(1.05);
}

.app button:active {
  transform: translateY(1px);
}

#message {
  color: var(--muted);
}

/* =========================
   QUIZ STYLING (inside iframe)
   ========================= */
.quiz {
  background: #0f1a33;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.quiz__header h2 {
  margin: 0;
  font-size: 22px;
}

.quiz__header p {
  margin: 8px 0 0;
  color: var(--muted);
}

.quiz__content p {
  margin: 16px 0 12px;
  font-size: 16px;
  line-height: 1.4;
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.quiz .choice {
  padding: 12px 14px;
  border-radius: 12px;
  background: #1a2445;
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  font-weight: 600;
  text-align: left;
  transition: transform 0.1s ease, background 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.quiz .choice:hover {
  background: #2a3a6b;
}

.quiz .choice:active {
  transform: translateY(1px);
}

.quiz .choice.correct {
  background: #22c55e;
  color: #fff;
}

.quiz .choice.wrong {
  background: #ef4444;
  color: #fff;
}

.quiz__controls {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
}

.quiz__controls button {
  width: 120px;
  padding: 12px;
  border-radius: 12px;
  background: var(--accent);
  color: white;
  font-weight: 600;
  text-align: center;
}

.answerBox {
  display: none;
  background: #111827;
  color: #fff;
  padding: 18px;
  border-radius: 14px;
  margin-top: 12px;
}

.codeBlock {
  background: #0f172a;
  padding: 12px;
  border-radius: 10px;
  overflow-x: auto;
  white-space: pre-wrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
`.trim();

const defaultJS = `
// ==============================
// Intro
// ==============================
const introButton = document.getElementById("magicBtn");
const introMessage = document.getElementById("message");

introButton.addEventListener("click", () => {
  introMessage.textContent = "Nice! You clicked the button. ✨";
  introMessage.style.color = "#22c55e";
});

// ==============================
// JS vs jQuery Challenges in plain js as a reference
// ==============================

// JS vs jQuery: Select an Element
// var message = document.getElementById('jqMessage');
// message.textContent = 'Hello from jQuery';

// JS vs jQuery: Button Click
// var button = document.getElementById('jqBtn');
// var result = document.getElementById('jqResult');
// button.addEventListener('click', function () {
// result.textContent = 'Button clicked!';
// });

// JS vs jQuery: Change CSS
// var text = document.getElementById('jqStyle');
// text.style.color = 'green';
// text.style.fontSize = '20px';

// JS vs jQuery: Show and Hide
// var text = document.getElementById('jqToggle');
// text.style.display = 'none';
// text.style.display = 'block';

// JS vs jQuery: Toggle Visibility
// var button = document.getElementById('jqToggleBtn');
// var text = document.getElementById('jqToggleText');
// button.addEventListener('click', function () {
// if (text.style.display === 'none') {
// text.style.display = 'block';
// } else {
// text.style.display = 'none';
// }
// });

// JS vs jQuery: Change HTML
// var box = document.getElementById('jqHtml');
// box.innerHTML = '<strong>Hello from jQuery</strong>';

// JS vs jQuery: Add Class
// var item = document.getElementById('jqClass');
// item.classList.add('active');

// JS vs jQuery: Remove Class
// var item = document.getElementById('jqRemove');
// item.classList.remove('active');

// JS vs jQuery: Loop Through Elements
// var items = document.querySelectorAll('.jqItem');
// items.forEach(function (item) {
// item.style.color = 'blue';
// });

// JS vs jQuery: Document Ready
// document.addEventListener('DOMContentLoaded', function () {
// console.log('Page loaded');
// });
`.trim();

const defaultCheatsheet = `
JavaScript Basics Cheatsheet
============================

1. Output
----------
console.log("text");


2. Variables
------------
var name = "value";
let age = 0;
const PI = 3.14;


3. Function
-----------
function functionName() {
  // code here
}


4. If / Else
------------
if (condition) {
  // code if true
} else {
  // code if false
}


5. If / Else If / Else
-----------------------
if (condition1) {
  // code if condition1 is true
} else if (condition2) {
  // code if condition2 is true
} else {
  // code if all are false
}


6. Switch
---------
switch (value) {
  case option1:
    // code
    break;
  case option2:
    // code
    break;
  default:
    // code if no case matches
}


7. For Loop
-----------
for (let i = 0; i < 5; i++) {
  // code to repeat
}


8. While Loop
-------------
while (condition) {
  // code to repeat while condition is true
}


9. Do...While Loop
------------------
do {
  // code runs at least once
} while (condition);


10. Break
----------
for (let i = 0; i < 10; i++) {
  if (condition) {
    break;
  }
}


11. Continue
------------
for (let i = 0; i < 10; i++) {
  if (condition) {
    continue;
  }
  // code runs only if condition is false
}


12. Return
----------
function getValue() {
  return value;
}


13. Arrays
----------
const fruits = ["Apple", "Banana", "Cherry"];


14. Objects
-----------
const person = {
  name: "Alex",
  age: 25
};


15. Accessing Properties
------------------------
person.name
person["age"]


16. Template Literals
----------------------
const name = "Alex";
console.log(\`Hello, \${name}\`);


17. Functions with Parameters
-----------------------------
function add(a, b) {
  return a + b;
}


18. Arrow Functions
-------------------
const add = (a, b) => a + b;


19. DOM Selection
-----------------
document.getElementById("id")
document.querySelector(".class")


20. Event Listeners
-------------------
element.addEventListener("click", () => {
  // code
});


21. setInterval / setTimeout
----------------------------
setTimeout(() => { /* code */ }, 1000);
setInterval(() => { /* code */ }, 1000);


`.trim();

// ==============================
// CodeMirror Editors
// ==============================
const htmlEditor = CodeMirror(document.getElementById("html"), {
	mode: "xml",
	theme: "material",
	lineNumbers: true,
	value: defaultHTML,
});

const cssEditor = CodeMirror(document.getElementById("css"), {
	mode: "css",
	theme: "material",
	lineNumbers: true,
	value: defaultCSS,
});

const jsEditor = CodeMirror(document.getElementById("js"), {
	mode: "javascript",
	theme: "material",
	lineNumbers: true,
	value: defaultJS,
});

const cheatsheetEditor = CodeMirror(document.getElementById("cheatsheet"), {
	mode: "text",
	theme: "material",
	lineNumbers: true,
	value: defaultCheatsheet,
});

const editors = {
	html: htmlEditor,
	css: cssEditor,
	js: jsEditor,
	cheatsheet: cheatsheetEditor,
};

// ==============================
// localStorage keys
// ==============================
const STORAGE_KEYS = {
	html: "live-editor-html",
	css: "live-editor-css",
	js: "live-editor-js",
	cheatsheet: "live-editor-cheatsheet",
	activeTab: "live-editor-active-tab",
};

// ==============================
// Restore saved code
// ==============================
if (localStorage.getItem(STORAGE_KEYS.html)) {
	htmlEditor.setValue(localStorage.getItem(STORAGE_KEYS.html));
}

if (localStorage.getItem(STORAGE_KEYS.css)) {
	cssEditor.setValue(localStorage.getItem(STORAGE_KEYS.css));
}

if (localStorage.getItem(STORAGE_KEYS.js)) {
	jsEditor.setValue(localStorage.getItem(STORAGE_KEYS.js));
}

if (localStorage.getItem(STORAGE_KEYS.cheatsheet)) {
	cheatsheetEditor.setValue(localStorage.getItem(STORAGE_KEYS.cheatsheet));
}

// ==============================
// Live preview update
// ==============================
let savedScroll = 0;

async function update() {
	// Save scroll position
	savedScroll = iframe.contentWindow.scrollY || 0;

	const challengesData = await fetch("assets/js/challengeData.json").then(
		(r) => r.json(),
	);

	const doc = `
    <html>
    <head>
      <style>${cssEditor.getValue()}</style>
      <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    </head>
    <body>
      ${htmlEditor.getValue()}
      <div id="challenges"></div>

      <script>
        const challenges = ${JSON.stringify(challengesData)};

        function renderChallenges() {
          const container = document.getElementById("challenges");
          container.innerHTML = "";

          challenges.forEach((c) => {
            const app = document.createElement("div");
            app.className = "app";

            app.innerHTML =
              '<header class="app__header">' +
                '<h1>' + c.title + '</h1>' +
                '<p>' + c.desc + '</p>' +
              '</header>' +
              '<main class="app__content">' +
                c.template +
                '<button class="show-answer" data-challenge="' + c.id + '">Show Answer</button>' +
                '<div class="answerBox" id="answer-' + c.id + '" style="display:none;">' +
                  '<h3>Answer</h3>' +
                  '<div class="codeBlock"></div>' +
                  '<button class="closeAnswer">Close</button>' +
                '</div>' +
              '</main>';

            container.appendChild(app);

            const codeBlock = app.querySelector(".codeBlock");
            codeBlock.textContent = c.answer;
          });
        }

        renderChallenges();

        document.addEventListener("click", (e) => {
          if (e.target.classList.contains("show-answer")) {
            const id = e.target.dataset.challenge;
            document.getElementById("answer-" + id).style.display = "block";
          }
          if (e.target.classList.contains("closeAnswer")) {
            e.target.closest(".answerBox").style.display = "none";
          }
        });
      </script>

      <script>${jsEditor.getValue()}</script>
    </body>
    </html>
  `;

	iframe.srcdoc = doc;

	// Restore scroll position after the iframe loads
	iframe.onload = () => {
		iframe.contentWindow.scrollTo(0, savedScroll);
	};
}

// ==============================
// Autosave + live update
// ==============================
htmlEditor.on("change", () => {
	localStorage.setItem(STORAGE_KEYS.html, htmlEditor.getValue());
	update();
});

cssEditor.on("change", () => {
	localStorage.setItem(STORAGE_KEYS.css, cssEditor.getValue());
	update();
});

jsEditor.on("change", () => {
	localStorage.setItem(STORAGE_KEYS.js, jsEditor.getValue());
	update();
});

cheatsheetEditor.on("change", () => {
	localStorage.setItem(STORAGE_KEYS.cheatsheet, cheatsheetEditor.getValue());
});

// ==============================
// Tabs logic
// ==============================
tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		const target = tab.dataset.tab;

		localStorage.setItem(STORAGE_KEYS.activeTab, target);

		tabs.forEach((t) => t.classList.remove("active"));
		tab.classList.add("active");

		panels.forEach((panel) => {
			panel.classList.toggle("active", panel.id === target);
		});

		// IMPORTANT: refresh CodeMirror when shown
		editors[target].refresh();
	});
});

// ==============================
// Restore active tab
// ==============================
const savedTab = localStorage.getItem(STORAGE_KEYS.activeTab);
if (savedTab) {
	document.querySelector(`.tab[data-tab="${savedTab}"]`)?.click();
} else {
	editors.html.refresh();
}

// ==============================
// Initial render
// ==============================
update();

// ==============================
// Reset button
// ==============================
resetBtn.addEventListener("click", () => {
	localStorage.removeItem(STORAGE_KEYS.html);
	localStorage.removeItem(STORAGE_KEYS.css);
	localStorage.removeItem(STORAGE_KEYS.js);
	localStorage.removeItem(STORAGE_KEYS.cheatsheet);

	htmlEditor.setValue(defaultHTML);
	cssEditor.setValue(defaultCSS);
	jsEditor.setValue(defaultJS);
	cheatsheetEditor.setValue(defaultCheatsheet);

	update();
});
