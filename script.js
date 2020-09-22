var vm = new Vue({
	el: "#app",
	data: {
		questions: questions
	},
	methods: {
		onSubmit() {
			this.questions.forEach(question => {
				question.answers.forEach(answer => {
					question.selected.forEach(usrAns => {
						if (usrAns == answer.id) { usrSel = true; }
						if (usrSel == answer.result) { ansCor = true;}
						else { ansCor = false }
					})
				})
				
			});
		}
	}
});