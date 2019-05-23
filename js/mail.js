var allowed_file_size = "10048576";
var allowed_files = ['application/rtf','application/mspowerpoint','application/msword','application/excel','application/pdf','text/plain', 'image/png', 'image/gif', 'image/jpeg', 'image/pjpeg'];
var border_color = "#C2C2C2"; //initial input border color

$("#contact_body").submit(function(e){
    e.preventDefault(); //prevent default action
    proceed = true;

    //simple input validation
    $($(this).find("input[data-required=true], textarea[data-required=true]")).each(function(){
            if(!$.trim($(this).val())){ //if this field is empty
                $(this).css('border-color','red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
    }).on("input", function(){ //change border color to original
         $(this).css('border-color', border_color);
    });

    //if everything's ok, continue with Ajax form submit
    if(proceed){
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method
        var form_data = new FormData(this); //Creates new FormData object

        $.ajax({ //ajax form submit
            url : post_url,
            type: request_method,
            data : form_data,
            dataType : "json",
            contentType: false,
            cache: false,
            processData:false
        }).done(function(res){ //fetch server "json" messages when done
            if(res.type == "error"){
                $("#contact_results").html('<div class="error">'+ res.text +"</div>");
            }

            if(res.type == "done"){
    			$("#contact_results").html('<div class="success alert alert-success">'+ res.text +"</div>");
			}
		});
	}
});
