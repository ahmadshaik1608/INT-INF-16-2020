var p = $( ".passedMe" );
var offset = p.offset();
offset = offset.top;

$(window).scroll(function () {  
    if ($(window).scrollTop()   >  offset ) {
      consoleog("passed");
 $('.showHide').fadeIn();
    }
  else { $('.showHide').fadeOut(); }
});

function myTest() {
    alert('Welcome to custom js');
}

$(function() {
    alert('Hello, custom js');
});