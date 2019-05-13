/*! Fades out the whole page when clicking links */
$('#lg').click(function(e) {
  e.preventDefault();
  const email = $('#logEmail').val();
  const password = $('#logPassword').val();
  newpage= this.href;
$.get("/login", {email, password}, function(data) {
  var newWin = window.open(newpage)
  newWin.onload = function(){ 
    var ident = newWin.document.getElementById('eee');
    const content = data.firstName + ' ' + data.lastName;
    ident.innerHTML = content; 
    window.open('login.html', '_self', '');
    window.close();
  };
});
});

/*! Fades out the whole page when clicking links */
$('#logout').click(function(e) {
  e.preventDefault();
  newLocation = this.href;
  $('body').fadeOut('slow', newpage);
  });
  function newpage() {
  window.location = newLocation;
  }

  $(document).ready(function(){

    /*! Fades in whole page on load */
    $('body').css('display', 'none');
    $('body').fadeIn(500);
    
    }); 

    $('#signupForm').submit(function(event) {
      event.preventDefault();
      const name = $('#firstname').val();
      const lastName = $('#lastname').val();
      const email = $('#userEmail').val();
      const password = $('#userPassword').val();
      $.post("/users", {name, lastName, email, password},  function(data) {

          $('#firstname').val('');
          $('#lastname').val('');
          $('#userEmail').val('');
          $('#userPassword').val('');

      });
  })
