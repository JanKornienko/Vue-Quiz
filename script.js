var vm = new Vue({
	el: "#app",
	data: {
		questions: questionsList,
		points: 0
	},
	methods: {
		onSubmit() {
			// Authentication of answers
			//this.points = 0
			this.questions.forEach(question => {
				question.answersList.forEach(answer => {
					answer.correct = question.correct.includes(answer.id);
					if ((question.selected.includes(answer.id)) && (answer.correct == false)) {	answer.wrong = true; }
				})
				//if (question.answersList.includes(wrong = true)) { points++; }
				if (question.selected == question.correct) {
					points++;
				}
			});
			console.log(points);
		}
	}
});