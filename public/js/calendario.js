	const myInput = document.querySelector("#calendar");
	const fp = flatpickr(myInput, {
		inline: true,
		enableTime: true,
		minuteIncrement: 60,
		minDate: "today",
		maxDate: new Date().fp_incr(30),
		minTime: "16:00",
		maxTime: "22:00",
		disable: [
			function (date) {
				return (date.getDay() === 0);
			}
		],
		locale: {
			firstDayOfWeek: 1,
			weekdays: {
				shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
				longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
			},
			months: {
				shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
				longhand: ['Enero', 'Febrero', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			},
		}
/* 		onDayCreate: function (dObj, dStr, fp, dayElem) {
			{{#each listadoCitas}}
			{
				{{#if fecha}}
					dayElem.innerHTML += "<span class='event busy'></span>";
				{{/if}}
			}
			{{/each}} 

		}, */
	});
