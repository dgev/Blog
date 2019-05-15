/*! Fades out the whole page when clicking links */


$('#lg').click(function(e) {
  e.preventDefault();
  const email = $('#logEmail').val();
  const password = $('#logPassword').val();
  let posts = new Array();
  newpage= this.href;
  $.get("/postsRecent", {}, function(data) {
    posts = data; 
  });

$.get("/login", {email, password}, function(data) {
  let newWin = window.open(newpage)
  window.open('login.html', '_self', '');
    window.close();
  newWin.onload = function(){ 
    let ident = newWin.document.getElementById('eee');
    ident.innerHTML = data.firstName + ' ' + data.lastName; 
    newWin.document.getElementById('user_email').append(`${data.email}`);
    for(i = 1; i<=3; i++){
      newWin.document.getElementById('post_'+i).innerHTML = posts[i-1].title;
      newWin.document.getElementById('p'+i).innerHTML = (posts[i-1].description.trim().length>100 ? posts[i-1].description.substr(0,200)+'...': posts[i-1].description) 
    }
    };
});
});



// function load() {
//   const email = $('#logEmail').val();
//   const password = $('#logPassword').val();
//   $.get("/login", {email, password}, function(data) {
//   let newWin = window.open('index.html')
//   window.open('login.html', '_self', '');
//     window.close();
//   newWin.onload = function(){ 
//     let ident = newWin.document.getElementById('eee');
//     ident.innerHTML = data.firstName + ' ' + data.lastName; 
//     newWin.document.getElementById('user_email').innerHTML = data.email;
//     };
// });
// }

// $('#del').click(function(e) {
//   e.preventDefault();
//   $.get("/postsRecent", {}, function(data) {
//     document.getElementById('post_4').innerHTML = data[0].title; 
//     document.getElementById('p4').innerHTML = data[0].description;
//     console.log(data[0]);    
//   });
// });

// function recent(){
//   $.get("/postsRecent", {}, function(data) {
//     document.getElementById('post_1').innerHTML = data[0].title; 
//     document.getElementById('p1').innerHTML = data[0].description;
//     console.log(data[0]);    
//   });
// }

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
    $('#title').val('');
    $('#message').val('');
})


