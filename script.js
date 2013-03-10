$(window).load(function(){
/* SET UP BASH LOGIC*/

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

//Set up kernel function

function bunzKernel(kernelcmd) {

    if (kernelcmd == "help") {
        $("#consoleoutput").val($("#consoleoutput").val() + "\n\n==============================================================\nHello, I'm the Open8 Bash! Pipe. Here are a list of commands you can run:\n\n-> flush\n\tClears the bash screen\n-> redubs\n-> launch\n-> f+\n\tIncrease bash font-size\n-> f-\n\tDecrease bash font-size");
    }
    if (kernelcmd == "f+") {
        $('#consoleoutput').css('font-size', (parseInt($('#consoleoutput').css('font-size')) + 3));
        $('#givencommand').css('font-size', (parseInt($('#consoleoutput').css('font-size')) + 3));
        $('#givencommandcursor').css('font-size', (parseInt($('#consoleoutput').css('font-size')) + 3));
       
    }
    if (kernelcmd == "f-") {
        $('#consoleoutput').css('font-size', (parseInt($('#consoleoutput').css('font-size')) - 3));
        $('#givencommand').css('font-size', (parseInt($('#consoleoutput').css('font-size')) - 3));
        $('#givencommandcursor').css('font-size', (parseInt($('#consoleoutput').css('font-size')) - 3));
        
    }
    if (kernelcmd == "flush") {
        $('#consoleoutput').val("");
    }

}
});
