import "./SnackAlert.css";
import "./custom.css";

var snackCounter = 0;
const SnackAlert = {
	init: () => {
		//creating the container and appending it
		let container = document.createElement("div");
		container.classList.add("snackalert", "container");
		document.body.appendChild(container);
	},
	make: (options) => {
		let defaultOptions = {
			dismissable: true,
			showAction: false,
			message: "Empty"
		}

		options = Object.assign(defaultOptions, options);
		let container = document.querySelector(".snackalert.container");
		
		//building the snackbar
		let snack = document.createElement("div");
		snack.classList.add("snackbar");
		snack.setAttribute("id", "snackbar-" + ++snackCounter);
		snack.dataset.snackbarPosition = 0;
		
		//building the message box
		let msgbox = document.createElement("p");
		msgbox.classList.add("message");
		msgbox.innerText = options.message;
		
		//appending the messagebox to the snackbar
		snack.appendChild(msgbox);
		
		if(options.dismissable) {
			//building the button
			let btn = document.createElement("button");
			btn.classList.add("action");
			btn.innerText = (options.showAction) ? options.actionMessage : "Dismiss";
			
			btn.addEventListener("click", ( event ) => {
				//dismissing the snackbar
				SnackAlert.dismiss(event.target.parentElement);
				
				//calling the callback function
				if(options.actionCallback)
				   options.actionCallback(event);
			});
			
			//appending the button to the snackbar
			snack.appendChild(btn);
		}

		let snackbars = container.querySelectorAll(".snackbar");
		snackbars.forEach((elem) => {
			let pos = parseInt(++elem.dataset.snackbarPosition);

			//deleting the snackbar if his position is over 5
			if(pos >= 5) {
				elem.dataset.snackalertShow = false;
				setTimeout(() => {
					container.removeChild(elem);
				}, 210);
				return;
			}
		});
		
		//appending the snackbar to the container
		container.appendChild(snack);
		
		//making the new snackbar visible
		setTimeout(() => {
			snack.dataset.snackalertShow = true;
		}, 200);
		
	},
	dismiss: ( snack ) => {
		let container = document.querySelector(".snackalert.container");
		
		//making it invisible
		snack.dataset.snackalertShow = false;
		
		setTimeout(() => {
			//adjust other snackbars
			let snackbars = container.querySelectorAll(".snackbar");
			snackbars.forEach((elem) => {				
				if(snack.dataset.snackbarPosition > elem.dataset.snackbarPosition)
					return;
			});		
			
			//removing the snackbar
			container.removeChild(snack);
		}, 200);
			
	}
}

export default SnackAlert;