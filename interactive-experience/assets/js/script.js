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
  <header class="app__header">
    <h1>Welcome to the Chubby's Interactive Experience</h1>
    <p>Edit the code and watch it update instantly.</p>
  </header>

  <main class="app__content">
    <button id="magicBtn">Click me</button>
    <p id="message">Try changing the HTML, CSS, or JS!</p>
  </main>
</div>

<div class="app">
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
</div>
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
const button = document.getElementById("magicBtn");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent = "Nice! You clicked the button. ✨";
  message.style.color = "#22c55e";
});
`.trim();

// ==============================
// CodeMirror Editors
// ==============================
const htmlEditor = CodeMirror(document.getElementById("html"), {
	mode: "xml",
	theme: "default",
	lineNumbers: true,
	value: defaultHTML,
});

const cssEditor = CodeMirror(document.getElementById("css"), {
	mode: "css",
	theme: "default",
	lineNumbers: true,
	value: defaultCSS,
});

const jsEditor = CodeMirror(document.getElementById("js"), {
	mode: "javascript",
	theme: "default",
	lineNumbers: true,
	value: defaultJS,
});

const editors = {
	html: htmlEditor,
	css: cssEditor,
	js: jsEditor,
};

// ==============================
// localStorage keys
// ==============================
const STORAGE_KEYS = {
	html: "live-editor-html",
	css: "live-editor-css",
	js: "live-editor-js",
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

	htmlEditor.setValue(defaultHTML);
	cssEditor.setValue(defaultCSS);
	jsEditor.setValue(defaultJS);

	update();
});
