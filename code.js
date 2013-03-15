$(window).load(function(){

/* SET UP TERMINAL LOGIC*/

// Set up command line width properties

$('#givencommand').css("width", 340);
$('#consolebox').css("width", $(window).width() - 20);
$('#consolebox').css("height", $(window).height() - 20 - $('givencommand').height());
$('#consoleoutput').css("width", $('#consolebox').width());
$('#consoleoutput').css("height", $('#consolebox').height());

// Set up cursor blinking

var fIn = function () {
    $("#currentcommandcursor").fadeIn(500, fOut);
};
var fOut = function () {
    $("#currentcommandcursor").fadeOut(500, fIn);
};
fIn();


// Set up the action of the enter key and capture current command

$(document).keypress(function (e) {
    if (e.which == 13) {

        $("#consoleoutput").val($("#consoleoutput").val() + "\n" + "~$" + $("#givencommand").val());

        var commandtobegiven = $("#givencommand").val();
        $("#givencommand").val("");
        $('#consoleoutput').scrollTop($('#consoleoutput')[0].scrollHeight);
        if (commandtobegiven != "") {

            bunzKernel(commandtobegiven);

        }
    }
});

//  Initialize the kernel databases

bunzKernel("initregex");

//Set up kernel function

function bunzKernel(kernelcmd) {
    
    
    // Set up Regex expressions (redundant) :)
    
        var colorRegex = /color #.{6}/;
        var launchRegex = /launch .+/;
    
    
    if(kernelcmd == "initregex"){
        
        var loadCounter; // Count the load
       for(loadCounter = 0; loadCounter <= 100; loadCounter++){
            
            Frame(2000, function(callback){ // each iteration would pause by 2 secs
                
                $("#consoleoutput").val("\nInitializing Regex..." + loadCounter + "%");          
                callback();
                
            }); 
           
        }
        
        Frame.start();
        bunzKernel("scrollbottom");

    }
    
    if(kernelcmd == "delay"){
        
      //Shit needs to go here

    }
    
    if (kernelcmd == "help") {
        $("#consoleoutput").val($("#consoleoutput").val() + "\n\n==============================================================\nHello, I'm the Dewey Terminal! Pipe. Here are a list of commands you can run:\n\n-> flush\n\tClears the bash screen\n-> redubs\n-> launch\n-> f+\n\tIncrease bash font-size\n-> f-\n\tDecrease bash font-size\n-> color #HEXCODE\n\tChanges the background of the terminal.");
        bunzKernel("scrollbottom");
    }
    if (kernelcmd == "f+") {
        $('#consoleoutput').css('font-size', (parseInt($('#consoleoutput').css('font-size')) + 3));
        $('#givencommand').css('font-size', (parseInt($('#consoleoutput').css('font-size')) + 3));
        $('body').css('font-size', (parseInt($('#consoleoutput').css('font-size')) + 3));
       
    }
    if (kernelcmd == "f-") {
        $('#consoleoutput').css('font-size', (parseInt($('#consoleoutput').css('font-size')) - 3));
        $('#givencommand').css('font-size', (parseInt($('#consoleoutput').css('font-size')) - 3));
        $('body').css('font-size', (parseInt($('#consoleoutput').css('font-size')) - 3));
        
    }
    
    // Check to see if flush command is entered
    
    if (kernelcmd == "flush") {
        $('#consoleoutput').val("");
    }
    
    // A private kernel only function
    
    if (kernelcmd == "scrollbottom") {
      $('#consoleoutput').scrollTop($('#consoleoutput')[0].scrollHeight);  
    }
    
    /* Logic for the color commands */
    
        if (colorRegex.test(kernelcmd)) {
          
          var hexGiven = kernelcmd.split("#");
          $('body').css("background", hexGiven[1]);
          $('html').css("background", hexGiven[1]);
          $('#consoleoutput').css("background", hexGiven[1]);
          
        }
        
        if (kernelcmd == "color") {
          
          $("#consoleoutput").val($("#consoleoutput").val() + "\nPlease specify a Hex code value to go along with that such as:\n\tcolor #212332");
          bunzKernel("scrollbottom");
         
        }
    
    // Logic for the launch command
    
    if (launchRegex.test(kernelcmd)) {
          
          var launchGiven = kernelcmd.split(" ");
          window.open(launchGiven[1]);
         
    }

}
});
