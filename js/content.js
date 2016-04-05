$(document).ready(function() {
    // $(document).on('selectionchange', function(e) {
    //     var selection = window.getSelection().toString() || "";
    // });


    // Icon to indicate where to open the iframe
    var openIcon = $('<img id="open" src="http://i.imgur.com/O1J3sW2.png?1" />').css({
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    position: "fixed",
                    top: "15px",
                    borderRadius: "0",
                    right: "15px", 
                    zIndex: "9999999999999",
                    padding: "0",
                    margin: "0"
                });

        

    // Icon to indicate where to close the iframe
    var exitIcon = $('<img id="close" src="http://i.imgur.com/LCsxarg.png">'). css({
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    position: "fixed",
                    top: "15px",
                    right: "330px",
                    zIndex: "99999999999999",
                    padding: "0",
                    margin: "0"
                });


    var iframe = $('<iframe id="form-iframe" /></iframe>').css({
                    width: "320px",
                    height: "1000px",
                    cursor: "pointer",
                    position: "fixed",
                    borderLeft: "3px solid Gainsboro",
                    backgroundColor: "white",
                    top: "0px",
                    right: "0px", 
                    zIndex: "99999999999"
                });

    // Wrap the existing page elements with a new element whose width will change when the iframe is opened
    var bodyWrap = $('body').children().wrap('<div class="push-over" style="margin: 0;  padding: 0; border-radius: 0;"></div>');

    // Append the open button to the DOM
    openIcon.prependTo("body");

    // Create a variable that will store the width of the main page when the iframe is open
    var closedDocWidth = $(document).width() - 320;

    

    // For selecting highlighted text from the user
    // var response = $(document).on('selectionchange', function(e) {
    //     var selection = window.getSelection().toString() || "";
    // });

    $(document).on('click', '#open', function(e) {

        // Change the width of the main web page to accommodate new iframe
        $('.push-over').css('width', closedDocWidth);
        
        // Remove any existing iframe
        $('#form-iframe').remove();

        // Prepend the iframe to the body
        iframe.prependTo('body').attr('src', 'http://localhost:3000/') //.contents().find('body').append('test');

        // Prepend an 'x' button to allow people to close the iframe
        exitIcon.prependTo('body');

        $('#open').remove();
    });



    $(document).on('click', '#close', function(e){

        // Remove iframe from side of page
        $('#form-iframe').remove();

        // Remove the close button
        $('#close').remove();

        // Restore width of original page elements
        $('.push-over').css("width", "100%");

        // Put the open icon back at the top of the page
        openIcon.prependTo("body");
    });

});