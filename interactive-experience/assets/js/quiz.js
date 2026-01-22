// assets/js/quiz.js
(() => {
	let current = 0;
	let answeredCorrectly = false;

	const quizContent = document.getElementById("quizContent");
	const quizStatus = document.getElementById("quizStatus");
	const nextBtn = document.getElementById("nextBtn");
	const backBtn = document.getElementById("backBtn");

	function render() {
		const item = quizData[current];
		answeredCorrectly = false;

		nextBtn.disabled = true;
		backBtn.disabled = current === 0;

		if (item.type === "mcq") {
			quizContent.innerHTML = `
                <p>${item.question}</p>
                <div class="choices" id="choices"></div>
                <p id="feedback"></p>
            `;

			const choicesDiv = document.getElementById("choices");

			item.choices.forEach((choice, index) => {
				const btn = document.createElement("button");
				btn.classList.add("choice");
				btn.dataset.index = index;
				btn.textContent = choice; // <- important!
				choicesDiv.appendChild(btn);
			});
		}

		if (item.type === "fill") {
			quizContent.innerHTML = `
				<p>${item.question}</p>
				<input type="text" id="answer" placeholder="Type your answer..." />
				<p id="feedback"></p>
			`;
		}

		quizStatus.textContent = `Question ${current + 1} of ${quizData.length}`;
	}

	function goNext() {
		current++;
		if (current >= quizData.length) {
			quizContent.innerHTML =
				"<p>Congratulations! You completed Module 1.</p>";
			nextBtn.style.display = "none";
			backBtn.style.display = "none";
			return;
		}
		render();
	}

	function goBack() {
		current--;
		if (current < 0) current = 0;
		render();
	}

	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("choice")) {
			const selected = Number(e.target.dataset.index);
			const feedback = document.getElementById("feedback");

			if (selected === quizData[current].answer) {
				feedback.textContent = "Correct! ✅";
				feedback.style.color = "#22c55e";
				answeredCorrectly = true;
				nextBtn.disabled = false;
			} else {
				feedback.textContent = "Wrong answer. Try again.";
				feedback.style.color = "#ef4444";
			}
		}
	});

	nextBtn.addEventListener("click", () => {
		const item = quizData[current];

		if (item.type === "fill") {
			const ans = document
				.getElementById("answer")
				.value.trim()
				.toLowerCase();
			const feedback = document.getElementById("feedback");

			if (ans === item.answer.toLowerCase()) {
				feedback.textContent = "Correct! ✅";
				feedback.style.color = "#22c55e";
				goNext();
			} else {
				feedback.textContent = "Not correct. Try again.";
				feedback.style.color = "#ef4444";
			}
		} else {
			if (answeredCorrectly) goNext();
		}
	});

	backBtn.addEventListener("click", goBack);

	render();
})();
