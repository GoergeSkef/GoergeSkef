
$(document).ready(function() {


	$("a.linked").on("click",function(a){
		a.preventDefault();

		$('.transition').addClass('step2');
		$('.transition').removeClass('step1 step3');


	});


	$("form").submit(function(a) {

		a.preventDefault();
		var form = $(this);
		var postform = true;
		var fields = $(this).find("*[required]");;

		fields.each(function() {

			var valid = validateField( $(this) );

			if ( !valid ) {


				postform = false;
			}
		});


		if ( !postform ) {


			a.preventDefault();

		} else {


			a.preventDefault();

			
			$.ajax({
				url: "js/users.json",
				dataType: "json"
			})
			.done(function( data ) {

 	var typedName = document.getElementById("usernames").value;
 	var typedEmail = document.getElementById("emails").value;


 for(var i=0; i<data.length;i++){

 	var user = data[i];
 	console.log(user.username);
 	console.log(typedName);

 	console.log(user.email);
 	console.log(typedEmail);

 	if ( user.username == typedName && user.email == typedEmail ) {
 		// user found
 		console.log('we have logged in!');
 		//$("input.linkedtonext").on("click",function(e){
			a.preventDefault();
			$(".transition").addClass('step3');
			$(".transition").removeClass('step1');
			$("form.step2").removeClass('step2');

		//});
 	}else {
 		//$("input.linkedtonext").on("click",function(e){
			$(".errors").addClass('errorshowing');
		//});

 	}

 }


			});
		

		}
	});

});

function validateField( field ) {

	field.closest("label").removeClass("error");

	var type = field.attr("type");
	var val = field.val();
	var valid = true;

	if ( type == "text" && (val == undefined || val == null || val == "") ) {
		valid = false;

	} else if ( type == "email" && !validateEmail(val) ) {
		valid = false;
	}

	if ( !valid ) {
		field.closest("label").addClass("error");
	}

	return valid;

}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}