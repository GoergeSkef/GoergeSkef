$(document).ready(function() {

	$("#additional").change(function() {

		var val = $(this).find("option:selected").attr("value");

		$(".for-Yes").removeClass("show");

		if ( val=="yes") {
			$(".for-Yes").addClass("show");

		}
	});

	$("form").submit( function(event) {
		
		var postform = true;

		var fields = $(this).find("*[required]");

		fields.removeClass("error");
		fields.each(function() {

			var type = $(this).attr("type");
			var val = $(this).val();

			if ( type== "text" ) {


				if( val == undefined || val == null || val == "" ) {

					postform = false;

					$(this).addClass("error");
				}

			}	else if ( type=="email" )	{

				if ( !validateEmail(val) ) { 

					postform = false;

					$(this).addClass("error");
				}

				if(postform){

							event.preventDefault();
							$("#fillform").addClass("hide");
							$("#thanks").removeClass("hide");
							
						}	else	{

							event.preventDefault();
						}
					
			}

		});

		if ( !postform ) {

			event.preventDefault();
		}

	} );

   
	$("a.open-platform").on("click", function(e) {
		e.preventDefault();
		


		$("body").addClass("platform-showing");
	})


	$(".platform .button.cancel").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("closing");

		var transEnd = " webkitTransitionEnd oTransitionEnd  MSTransitionEnd";
		$(".platform-container .platform").one(transEnd, function() {

			$("body").removeClass("platform-showing closing");
			$(this).off(transEnd);
		});
	})

	
})



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()
    	);
}