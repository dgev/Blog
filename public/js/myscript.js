/*! Fades out the whole page when clicking links */
//let userEmail;
global = window;
global.usermail = "userX";
$('#lg').click(function(e) {
  e.preventDefault();
  const email = $('#logEmail').val();
  const password = $('#logPassword').val();
  newpage= this.href;

$.get("/login", {email, password}, function(data) {
  let newWin = window.open(newpage)
  window.open('login.html', '_self', '');
    window.close();
  newWin.onload = function(){ 
    let ident = newWin.document.getElementById('eee');
    ident.innerHTML = data.firstName + ' ' + data.lastName; 
    newWin.document.getElementById('user_email').innerHTML = data.email;
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

  $('#create').click(function(event) {
    event.preventDefault();
    const email = document.getElementById("user_email").textContent;
    const title = $('#title').val();
    const description = $('#message').val();
    $.post("/posts", { email, title, description},  function(data) {
      document.getElementById("user_email").textContent;
      $('#title').val();
      $('#message').val();
    });
    $('#reset').reset();
})
