$(document).ready(function() {

    // var openInstructions = $('<div id="instructions">Select some text to begin.</div>').css({
    //     padding: "15px",
    //     position: "fixed",
    //     width: "230px",
    //     top: "70px",
    //     right: "0px",
    //     backgroundColor: "white",
    //     border: "3px solid lightblue",
    //     borderBottom: "6px solid lightblue",
    //     borderRight: "none",
    //     borderRadius: "5px 0px 0px 5px",
    //     fontSize: "13pt",
    //     zIndex: "999999999"
    // });
    // Append open instructions to DOM
    // openInstructions.prependTo("body");

    // Icon to indicate where to open the iframe
    var openIcon = $('<img id="open" src="http://i.imgur.com/daDFU4L.png" />').css({
        width: "50px",
        height: "50px",
        cursor: "pointer",
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "0",
        margin: "0",
        zIndex: "9999999999999"
    });

    // Icon to indicate where to close the iframe
    var exitIcon = $('<img id="close" src="http://i.imgur.com/q617r5i.png">'). css({
        width: "50px",
        height: "50px",
        cursor: "pointer",
        position: "fixed",
        top: "20px",
        right: "330px",
        zIndex: "99999999999999",
        padding: "0",
        margin: "0"
    });


    // The iframe to be appended to the side of the screen
    var iframe = $('<iframe id="form-iframe" scrolling="yes" /></iframe>').css({
        width: "320px",
        height: "100%",
        cursor: "pointer",
        position: "fixed",
        paddingBottom: "50px",
        borderLeft: "3px solid Gainsboro",
        backgroundColor: "white",
        top: "0px",
        right: "0px",
        frameBorder: "0",
        zIndex: "99999999999",
        overflow: "scroll"
    });

    // Wrap the existing page elements with a new element whose width will change when the iframe is opened
    var bodyWrap = $('body').children().wrap('<div class="push-over" style="margin: 0;  padding: 0; border-radius: 0;"></div>');

    // Append the open button to the DOM when the user has selected more than five characters
    $(document).on('selectionchange', function(e) {
        var selection = window.getSelection().toString();

        if (selection.length > 5) {
            openIcon.prependTo("body");
            // $('#instructions').text('Start!');
        } else {
            openIcon.remove();
            // $('#instructions').text('Select some text to begin.');
        }

    });

    // Create a variable that will store the width of the main page when the iframe is open
    var closedDocWidth = $(document).width() - 320;

    // Encoded URL of the current article page
    var pageUrl = encodeURIComponent(window.location)

    // For selecting highlighted text from the user

    function getSelectedText() {
        var selection = window.getSelection().toString() || "";
        var encodedSelection = encodeURIComponent(selection);

        var span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        span.style.padding = "5px";
        span.style.borderRadius = "5px";
        span.className = "highlighted-text";

        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(span);
            sel.removeAllRanges();
            sel.addRange(range);
        }



        return encodedSelection;
    }


    // What happens when the user clicks the 'open' button
    $(document).on('click', '#open', function(e) {

        // Change the width of the main web page to accommodate new iframe
        $('.push-over').css('width', closedDocWidth);

        // Remove any existing iframe
        $('#form-iframe').remove();

        // var urlBase = 'https://v3-api.herokuapp.com/articles/new/?url='
        var urlBase = 'http://localhost:3000/articles/new/?url='

        // Prepend the iframe to the body
        iframe.prependTo('body').attr('src', urlBase + pageUrl + '&component_title=' + getSelectedText()) //.contents().find('body').append('test');

        // Prepend an 'x' button to allow people to close the iframe
        exitIcon.prependTo('body');

        console.log(getSelectedText());

        // Remove the 'open button'
        $('#open').remove();
        // $('#instructions').remove();

    });




    // What happens when the user clicks the 'x' button
    $(document).on('click', '#close', function(e){

        // Remove iframe from side of page
        $('#form-iframe').remove();

        // Remove the 'x' button
        $('#close').remove();

        // Restore width of original page elements
        $('.push-over').css("width", "100%");

        // Put the 'open' icon back at the top of the page
        openIcon.prependTo("body");
        // openInstructions.prependTo("body")

        $('span.highlighted-text').contents().unwrap();
    });
});
