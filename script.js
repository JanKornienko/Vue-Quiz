var vm = new Vue({
	el: "#app",
	data: {
		questions: questionsList,
		questionInput: "",
		answerInput: "",
		answersInputList: [],
		correctInputList: [],
	},
	methods: {
		onSubmit() {
			// Authentication of answers
			this.questions.forEach(question => {
				question.answersList.forEach(answer => {
					answer.correct = question.correct.includes(answer.id);
					if ((question.selected.includes(answer.id)) && (answer.correct == false)) {	answer.wrong = true; }
				})
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
				};
				this.answerInput = "";
			} else { alert("Empty answer input"); }
		},

		newQuestion() {
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
				if (this.questionInput == "") { alert("Empty question input"); }
				if (this.answersInputList.length <= 0) { alert("You didn't add any answer for the question") }
				if (this.correctInputList.length <= 0) { alert("Not selected at lease one correct answer"); }
			}
		},

		reset() {
			this.questions.forEach(question => {
				question.answersList.forEach(answer => {
					answer.correct = false;
					answer.wrong = false;
				})
				question.selected = [];
			})
		}
		
	}
});