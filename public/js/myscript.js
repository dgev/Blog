let email = sessionStorage.getItem("email");

//let personal_posts = new Array();

console.log(email);

<<<<<<< HEAD
=======
 let email = sessionStorage.getItem("email");
 //let personal_posts = new Array();
 console.log(email);

//  function Delete(){  
//   let _id = this.id;
//   $.post('/deletePost', {_id}, function(data) {
//       });
//       document.getElementById(_id+1).innerHTML = '';
//       document.getElementById(_id+2).innerHTML = '';
  
// }
>>>>>>> 55125fc85db65119bc5ffd68de5ed87e2659179a
// // $.get("/", function(data) {

// //         data.forEach(element => {

// //         document.getElementById("studentList").append(`<li class="list-group-item">${element.email}</li>`)

// //     });

// // });

if (email) {





$.get("/postsByEmail", {email}, function(data) {
<<<<<<< HEAD

 data.forEach(function(element) {

     console.log(element.title);



     let blog = document.createElement("DIV");

     let title = document.createElement("H3");

     let body = document.createElement("P");

     //blog.append('<input type="checkbox" ' + 'VisibleCheckbox" name="'  + "remove"+ 'VisibleCheckbox" >')

     title.innerHTML = element.title;

     body.innerHTML = element.description;

     blog.appendChild(title);

     blog.appendChild(body);

     document.getElementById("personalBG").appendChild(blog);

   });

   });



   $.get("/postsRecent", {}, function(data) {

     for(i = 1; i<=3; i++){

       document.getElementById('read'+i).href = data[i-1]._id;

       document.getElementById('post_'+i).innerHTML = data[i-1].title;

       document.getElementById('p'+i).innerHTML = (data[i-1].description.trim().length>100

       ? data[i-1].description.substr(0,200)+'...': data[i-1].description)

     }

   });



 $.get("/UserByEmail", {email}, function(data) {

     let ident = document.getElementById('eee');

     ident.innerHTML = data.firstName + ' ' + data.lastName;

     document.getElementById('user_email').append(`${data.email}`);

 });

=======
  data.forEach(function(element) {
      console.log(element.title);

      let blog = document.createElement("DIV");
      let title = document.createElement("H3");
      let body = document.createElement("P");
      let button = document.createElement("button");
      //blog.append('<input type="checkbox" ' + 'VisibleCheckbox" name="'  + "remove"+ 'VisibleCheckbox" >')
      title.innerHTML = element.title;
      body.innerHTML = element.description;
      title.style. marginTop = '100px';
      title.style. marginBottom = '50px';
      body.style. marginBottom = '50px';
      button.style.width = '200px';
      button.innerHTML = "Delete";     
      button.setAttribute("class", "btn btn-primary btn-outline-primary btn-block");
      title.setAttribute("id", element._id + 1); 
      body.setAttribute("id", element._id + 2); 
      button.setAttribute("id", element._id);
      button.onclick = function Delete(){  
        let _id = this.id;
        $.post('/deletePost', {_id}, function(data) {
            });
            document.getElementById(_id+1).innerHTML = '';
            document.getElementById(_id+2).innerHTML = '';
            let button = document.getElementById(_id);
            button.parentNode.removeChild(button);
        
      };     
      blog.appendChild(title);
      blog.appendChild(body);
      blog.appendChild(button); 
      document.getElementById("personalBG").appendChild(blog);
    });
    });

    $.get("/postsRecent", {}, function(data) {
      for(i = 1; i<=3; i++){
        document.getElementById('read'+i).href = data[i-1]._id;
        document.getElementById('post_'+i).innerHTML = data[i-1].title;
        document.getElementById('p'+i).innerHTML = (data[i-1].description.trim().length>100
        ? data[i-1].description.substr(0,200)+'...': data[i-1].description)
      }
    });

  $.get("/UserByEmail", {email}, function(data) {
      let ident = document.getElementById('eee');
      ident.innerHTML = data.firstName + ' ' + data.lastName;
      document.getElementById('user_email').append(`${data.email}`);
  });
>>>>>>> 55125fc85db65119bc5ffd68de5ed87e2659179a
}



$('#lg').click(function(e) {

 e.preventDefault();

 const email = $('#logEmail').val();

 const password = $('#logPassword').val();



//  let personal_posts = new Array();

 sessionStorage.setItem("email", email);

 newpage= this.href;





$.get("/login", {email, password}, function(data) {

 let newWin = window.open(newpage)

 window.open('login.html', '_self', '');

 window.close();

 newWin.onload();

});

});

<<<<<<< HEAD




=======
>>>>>>> 55125fc85db65119bc5ffd68de5ed87e2659179a
$('#read1').click(function(e) {

 e.preventDefault();

 length = this.href.length;

 id = this.href.substr(22,length-1);

 readMore(id);

})



$('#read2').click(function(e) {

 e.preventDefault();

 length = this.href.length;

 id = this.href.substr(22,length-1);

 readMore(id);

})



$('#read3').click(function(e) {

 e.preventDefault();

 length = this.href.length;

 id = this.href.substr(22,length-1);

 readMore(id);

})





function readMore(_id) {



$.get("/postByID", {_id}, function(data) {

 let newWin = window.open('post.html')

 newWin.onload = function(){

   let ident = newWin.document.getElementById('heading');

   ident.innerHTML = data.title;

   newWin.document.getElementById('text').append(`${data.description}`);

   };

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
<<<<<<< HEAD

 e.preventDefault();

 sessionStorage.setItem("email", "");

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

   // $.ajax("/posts",{ email, title, description},  function(data) {

   //   document.getElementById("user_email").textContent;

   //   $('#title').val();

   //   $('#message').val();

   // });

   // $('#title').val('');

   // $('#message').val('');



   // });



   $.post("/posts", { email, title, description},  function(data) {

     document.getElementById("user_email").textContent;

     $('#title').val();

     $('#message').val();

   });

   let blog = document.createElement("DIV");

       let blog_title = document.createElement("H3");

       let body = document.createElement("P");

       blog_title.innerHTML = title;

       body.innerHTML = description;

       blog.appendChild(blog_title);

       blog.appendChild(body);

       document.getElementById("personalBG").appendChild(blog);

   $('#title').val('');

   $('#message').val('');

   $.get("/postsRecent", {}, function(data) {

   for(i = 1; i<=3; i++){

       document.getElementById('read'+i).href = data[i-1]._id;

       document.getElementById('post_'+i).innerHTML = data[i-1].title;

       document.getElementById('p'+i).innerHTML = (data[i-1].description.trim().length>100 ? data[i-1].description.substr(0,200)+'...': data[i-1].description)

     }

   });

   // $.get("/savedPost", {email}, function(data) {



   //     let blog = document.createElement("DIV");

   //     let title = document.createElement("H3");

   //     let body = document.createElement("P");

   //     title.innerHTML = data.title;

   //     body.innerHTML = data.description;

   //     blog.appendChild(title);

   //     blog.appendChild(body);

   //     document.getElementById("personalBG").appendChild(blog);

   //   });

   });
=======
  e.preventDefault();
  sessionStorage.setItem("email", "");
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
    // $.ajax("/posts",{ email, title, description},  function(data) {
    //   document.getElementById("user_email").textContent;
    //   $('#title').val();
    //   $('#message').val();
    // });
    // $('#title').val('');
    // $('#message').val('');

    // });

    $.post("/posts", { email, title, description},  function(data) {
      document.getElementById("user_email").textContent;
      $('#title').val();
      $('#message').val();
    });
        let blog = document.createElement("DIV");
        let blog_title = document.createElement("H3");
        let body = document.createElement("P");
        let button = document.createElement("button");
        blog_title.style. marginTop = '100px';
        blog_title.style. marginBottom = '50px';
        body.style. marginBottom = '50px';
        button.style.width = '200px';
        button.innerHTML = "Delete";     
        button.setAttribute("class", "btn btn-primary btn-outline-primary btn-block" + "delete");
        //button.setAttribute("id", element._id);
        blog_title.innerHTML = title;
        body.innerHTML = description;
        blog.appendChild(blog_title);
        blog.appendChild(body);
        blog.appendChild(button); 
        document.getElementById("personalBG").appendChild(blog);
    $('#title').val('');
    $('#message').val('');
    $.get("/postsRecent", {}, function(data) {
    for(i = 1; i<=3; i++){
        document.getElementById('read'+i).href = data[i-1]._id;
        document.getElementById('post_'+i).innerHTML = data[i-1].title;
        document.getElementById('p'+i).innerHTML = (data[i-1].description.trim().length>100 ? data[i-1].description.substr(0,200)+'...': data[i-1].description)
      }
    });
    // $.get("/savedPost", {email}, function(data) {

    //     let blog = document.createElement("DIV");
    //     let title = document.createElement("H3");
    //     let body = document.createElement("P");
    //     title.innerHTML = data.title;
    //     body.innerHTML = data.description;
    //     blog.appendChild(title);
    //     blog.appendChild(body);
    //     document.getElementById("personalBG").appendChild(blog);
    //   });
    })};
>>>>>>> 55125fc85db65119bc5ffd68de5ed87e2659179a
