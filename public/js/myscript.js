

 let email = sessionStorage.getItem("email");
 //let personal_posts = new Array();
 console.log(email);

if (email) {
 // Set name, lastaname to page
$.get("/UserByEmail", {email}, function(data) {
    let ident = document.getElementById('eee');
    ident.innerHTML = data.firstName + ' ' + data.lastName;
    document.getElementById('user_email').append(`${data.email}`);
});

// Get last three recent Posts

$.get("/postsRecent", {}, function(data) {
  for(i = 1; i<=3; i++){
    document.getElementById('read'+i).href = data[i-1]._id;
    document.getElementById('post_'+i).innerHTML = data[i-1].title;
    document.getElementById('p'+i).innerHTML = (data[i-1].description.trim().length>100
    ? data[i-1].description.substr(0,200)+'...': data[i-1].description)
  }
});


// Get personal posts of a user

$.get("/postsByEmail", {email}, function(data) {
  data.forEach(function(element) {
      let blog = document.createElement("DIV");
      let title = document.createElement("H3");
      let body = document.createElement("P");
      let button = document.createElement("button");
      let updateButton = document.createElement("button");
      title.innerHTML = element.title;
      body.innerHTML = element.description;
      title.style. marginTop = '100px';
      title.style. marginBottom = '50px';
      body.style. marginBottom = '50px';
      button.style.width = '200px';
     updateButton.style.width = '200px';
     button.innerHTML = "Delete";
     updateButton.innerHTML = "Update";
     button.setAttribute("class", "btn btn-primary btn-outline-primary btn-block");
     updateButton.setAttribute("class", "btn btn-primary btn-outline-primary btn-block");
      blog.setAttribute("id", element._id + 0);
      title.setAttribute("id", element._id + 1);
      body.setAttribute("id", element._id + 2);
     button.setAttribute("id", element._id);
      updateButton.setAttribute("id", "u" + element._id);
      button.onclick = function Delete(){
        let _id = this.id;
        $.post('/deletePost', {email, _id}, function(data) {
            });
            document.getElementById(_id+1).innerHTML = '';
            document.getElementById(_id+2).innerHTML = '';
            let button = document.getElementById(_id);
            button.parentNode.removeChild(button);
            button = document.getElementById("u"+_id);
            button.parentNode.removeChild(button);

       };
      // updateButton.onclick = function Update(){
      //   let length = this.id.length;
      //   let _id = this.id.substr(1,length-1);
      //   let blog = document.getElementById(_id+0);
      //   let title = document.getElementById(_id+1);
      //   let body = document.getElementById(_id+2);
      //   let button = document.getElementById("u"+_id);
      //   let input = document.createElement("input");
      //   input.type = "text";
      //   input.style. marginTop = '50px';
      //   input.setAttribute("id", "updateTitle");
      //   input.className = "label";
      //   let textarea = document.createElement("textarea");
      //   textarea.setAttribute("id", "updateBody");
      //   textarea.setAttribute("cols", "30");
      //   textarea.setAttribute("rows", "10");
      //   textarea.className = "form-control";
      //   input.value = title.textContent;
      //   textarea.innerHTML = body.textContent;
      //   title.parentNode.removeChild(title);
      //   body.parentNode.removeChild(body);
      //   button.parentNode.removeChild(button);

        // let div1 = document.createElement("DIV");
        // div1.className = "row mb-4";
        // let div2 = document.createElement("DIV");
        // div2.className = "form-group col-md-4";
        // let div3 = document.createElement("DIV");
        // div3.className = "form-field-icon-wrap";
        // let div4 = document.createElement("DIV");
        // div4.className = "form-group col-md-12";
        // div4.appendChild(textarea);
        // div3.appendChild(input);
        // div2.appendChild(div3);
        // div1.appendChild(div2);
        // div1.appendChild(div4);
        // blog.appendChild(div1);
        // let submitButton = document.createElement("button");

        // submitButton.innerHTML = "Submit";
        // submitButton.style.width = '200px';
        // submitButton.setAttribute("class", "btn btn-primary btn-outline-primary btn-block");
        // submitButton.setAttribute("id", "submit_update");
        // blog.appendChild(submitButton);
      //  submitButton.onclick = function Submit(){
      //       const title = $('#updateTitle').val();
      //       const description = $('#updateBody').val();

    //          $.post("/posts", { email, title, description},  function(data) {
    //            document.getElementById("user_email").textContent;
    //            $('#title').val();
    //            $('#message').val();
    //          });
    //              let blog = document.createElement("DIV");
    //              let blog_title = document.createElement("H3");
    //              let body = document.createElement("P");
    //              let button = document.createElement("button");
    //              blog_title.style. marginTop = '100px';
    //              blog_title.style. marginBottom = '50px';
    //              body.style. marginBottom = '50px';
    //              button.style.width = '200px';
    //              button.innerHTML = "Delete";
    //              button.setAttribute("class", "btn btn-primary btn-outline-primary btn-block" + "delete");
    //              button.setAttribute("id", element._id);
    //              blog_title.innerHTML = title;
    //             body.innerHTML = description;
    //             blog.appendChild(blog_title);
    //             blog.appendChild(body);
    //             blog.appendChild(button);
    //             document.getElementById("personalBG").appendChild(blog);
    //         $('#title').val('');
    //         $('#message').val('');
    //         $.get("/postsRecent", {}, function(data) {
    //         for(i = 1; i<=3; i++){
    //             document.getElementById('read'+i).href = data[i-1]._id;
    //             document.getElementById('post_'+i).innerHTML = data[i-1].title;
    //             document.getElementById('p'+i).innerHTML = (data[i-1].description.trim().length>100 ? data[i-1].description.substr(0,200)+'...': data[i-1].description)
    //           }
    //     })
      blog.appendChild(title);
      blog.appendChild(body);
      blog.appendChild(button);
      blog.appendChild(updateButton);
      document.getElementById("personalBG").appendChild(blog);
    // };

//    };
});
});
};

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
};

/*! Fades out the whole page when clicking links */
$('#logout').click(function(e) {
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
  });
