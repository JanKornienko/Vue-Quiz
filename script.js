var vm = new Vue({
	el: "#app",
	data: {
		questions: questionsList,
		questionInput: "",
		answerInput: "",
		answersInputList: [],
		correctInputList: [],
		pointsInput: null,
		points: 0
	},
	methods: {
		onSubmit() {
			// Authentication of answers
			this.questions.forEach(question => {
				question.answersList.forEach(answer => {
					answer.correct = question.correct.includes(answer.id);
					if ((question.selected.includes(answer.id)) && (answer.correct == false)) {	answer.wrong = true; }
					if ((!(question.selected.includes(answer.id))) && (answer.correct == false)) {	answer.wrong = false; }
				})
				this.isEqual(question.selected, question.correct);
				if (pointsInput != false) { this.points++; }
			})
		},

		newAnswer() {
			// Write new answer
			if (this.answerInput != "") {
				this.answersInputList.push({
					id: this.answersInputList.length,
					answer: this.answerInput,
					correct: false,
					wrong: false
				});
				// Checkbox for correct answer
				if (document.getElementById("correctCheckbox").checked == true) {
					this.correctInputList.push(this.answersInputList.length - 1);
				}
				this.answerInput = "";
			} else { alert("Empty answer input"); }
		},

		// Function for adding new question
		newQuestion() {
			this.reset();
			if ((this.questionInput != "") && (this.correctInputList.length > 0) && (this.answersInputList.length > 0)) {
				this.questions.push({
					question: this.questionInput,
					answersList: this.answersInputList,
					correct: this.correctInputList,
					selected: []
				});
				this.questionInput = "";
				this.answersInputList = [];
				this.correctInputList = [];
			} else {
				// Alerts if some error occurs
				if (this.questionInput == "") { alert("Empty question input"); }
				if (this.answersInputList.length <= 0) { alert("You didn't add any answer for the question") }
				if (this.correctInputList.length <= 0) { alert("Not selected at lease one correct answer"); }
			}
		},

		// Reset color for unchecked answers
		reset() {
			this.questions.forEach(question => {
				question.answersList.forEach(answer => {
					answer.correct = false;
					answer.wrong = false;
				})
				question.selected = [];
			})
		},

		// Delete answer from list
		deleteAns(index) {
			this.answersInputList.splice(index, 1);
		},

		// Control correct and selected answers
		isEqual(arrSel, arrCor) {
			pointsInput = null;
			arrSel.forEach(selItem => {
				if (!(arrCor.includes(selItem))) {
					pointsInput = false;
				}
			})
			arrCor.forEach(corItem => {
				if (!(arrSel.includes(corItem))) {
					pointsInput = false;
				}
			})
		}
	}
});