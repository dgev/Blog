let email = sessionStorage.getItem("email");
function Clear(){
localStorage.removeItem("recent_body");
localStorage.removeItem("begin");
localStorage.removeItem("recent_title");
};

function Recent() {
  $.get("/postsRecent", {}, function(data) {
    for (i = 1; i <= 3; i++) {
      document.getElementById('read'+i).href = data[i-1]._id;
      document.getElementById('post_' + i).innerHTML = data[i - 1].title;
      document.getElementById('p' + i).innerHTML = (data[i - 1].description.trim().length > 100 ? data[i - 1].description.substr(0, 200) + '...' : data[i - 1].description);
    }
  });
};

if (email) {
  console.log(email);
  // Set name, lastaname to page
  $.get("/UserByEmail", {
    email
  }, function(data) {
    let ident = document.getElementById('eee');
    ident.innerHTML = data.firstName + ' ' + data.lastName;
    document.getElementById('user_email').append(`${data.email}`);
  });

  // Get last three recent Posts

  Recent();

  $('#read1').click(async function(e) {
    e.preventDefault();
    Clear();
    length = this.href.length;
    id = this.href.substr(22,length-1);
    await readMore(id);
  })

  $('#read2').click(function(e) {
    Clear();
    e.preventDefault();
    length = this.href.length;
    id = this.href.substr(22,length-1);
    readMore(id);
  })

  $('#read3').click(function(e) {
    Clear();
    e.preventDefault();
    length = this.href.length;
    id = this.href.substr(22,length-1);
    readMore(id);
  })


  async function readMore(_id) {

  $.get("/postByID", {_id}, function(data) {
      let newWin = window.open('post.html')
      newWin.onload = function(){
      let recent_title = data.title;
      let recent_body = data.description;
      //let begin = 0;
      //console.log(recent_title);

      let ident = newWin.document.getElementById('heading');
      ident.innerHTML = recent_title;
      newWin.document.getElementById('text').append(`${recent_body}`);
      localStorage.setItem("begin", '');
      localStorage.setItem("recent_title", recent_title);
      localStorage.setItem("recent_body", recent_body);
      };
  });
  }

  // Get personal posts of a user
  function loading(element) {

    let blog = document.createElement("DIV");
    let blog_body = document.createElement("DIV");
    let blog_buttons = document.createElement("DIV");
    let title = document.createElement("H3");
    let body = document.createElement("P");
    let button = document.createElement("button");
    let updateButton = document.createElement("button");
    title.innerHTML = element.title;
    body.innerHTML = element.description;
    title.style.marginTop = '100px';
    title.style.marginBottom = '50px';
    body.style.marginBottom = '50px';
    button.style.width = '200px';
    updateButton.style.width = '200px';
    button.innerHTML = "Delete";
    updateButton.innerHTML = "Update";
    button.setAttribute("class", "btn btn-primary btn-outline-primary btn-block");
    updateButton.setAttribute("class", "btn btn-primary btn-outline-primary btn-block");
    blog.setAttribute("id", element._id + 0);
    blog_body.setAttribute("id", element._id + "body");
    blog_buttons.setAttribute("id", element._id + "buttons");
    title.setAttribute("id", element._id + 1);
    body.setAttribute("id", element._id + 2);
    button.setAttribute("id", element._id);
    updateButton.setAttribute("id", "u" + element._id);
    button.onclick = function Delete() {
      let _id = this.id;
      $.post('/deletePost', {
        email,
        _id
      }, function(data) {});
      document.getElementById(_id + 1).innerHTML = '';
      document.getElementById(_id + 2).innerHTML = '';
      let button = document.getElementById(_id);
      button.parentNode.removeChild(button);
      button = document.getElementById("u" + _id);
      button.parentNode.removeChild(button);
      Recent();
    };
    updateButton.onclick = function Update() {
      let length = this.id.length;
      let _id = this.id.substr(1, length - 1);
      let blog = document.getElementById(_id + 0);
      let blog_title = document.getElementById(_id + 1);
      let body = document.getElementById(_id + 2);
      let button = document.getElementById(_id);
      let updateB = document.getElementById("u" + _id);
      let input = document.createElement("input");
      input.type = "text";
      input.style.marginTop = '50px';
      input.setAttribute("id", "updateTitle");
      input.className = "label";
      let textarea = document.createElement("textarea");
      textarea.setAttribute("id", "updateBody");
      textarea.setAttribute("cols", "30");
      textarea.setAttribute("rows", "10");
      textarea.className = "form-control";
      input.value = title.textContent;
      textarea.innerHTML = body.textContent;
      body.parentNode.removeChild(body);
      blog_title.parentNode.removeChild(blog_title);
      updateB.parentNode.removeChild(updateB);
      button.parentNode.removeChild(button);

      let div1 = document.createElement("DIV");
      div1.className = "row mb-4";
      let div2 = document.createElement("DIV");
      div2.className = "form-group col-md-4";
      let div3 = document.createElement("DIV");
      div3.className = "form-field-icon-wrap";
      let div4 = document.createElement("DIV");
      div4.className = "form-group col-md-12";
      div4.appendChild(textarea);
      div3.appendChild(input);
      div2.appendChild(div3);
      div1.appendChild(div2);
      div1.appendChild(div4);
      blog.appendChild(div1);
      let submitButton = document.createElement("button");
      submitButton.innerHTML = "Submit";
      submitButton.style.width = '200px';
      submitButton.setAttribute("class", "btn btn-primary btn-outline-primary btn-block");
      submitButton.setAttribute("id", "s");
      blog.appendChild(submitButton);
      $('#s').click(function(e) {
        console.log('in submit');

        e.preventDefault();
        const title = $('#updateTitle').val();
        const description = $('#updateBody').val();
        $.post('/updateTitleDesciption', {
          _id,
          title,
          description
        }, function(data) {

          $('#updateTitle').val();
          $('#updateBody').val();
        });
        div1.parentNode.removeChild(div1);
        submitButton.parentNode.removeChild(submitButton);
        blog_title.innerHTML = title;
        body.innerHTML = description;
        blog_body.appendChild(blog_title);
        blog_body.appendChild(body);
        blog_buttons.appendChild(button);
        blog_buttons.appendChild(updateB);
        blog.appendChild(blog_body);
        blog.appendChild(blog_buttons);
        Recent();
      });
    };
    blog_body.appendChild(title);
    blog_body.appendChild(body);
    blog_buttons.appendChild(button);
    blog_buttons.appendChild(updateButton);
    blog.appendChild(blog_body);
    blog.appendChild(blog_buttons);
    document.getElementById("personalBG").appendChild(blog);
  }
  $.get("/postsByEmail", {
    email
  }, function(data) {
    data.forEach(function(element) {
      loading(element);
    });
  });
// console.log                 
//  if (window.location.pathname === "/login.html" || window.location.pathname === "/")
//  document.open('index.html', '_self', '');
//   // || $.get("/")){
//     //  window.open('index.html', '_self', '');
//   //}

 };






$('#lg').click(function(e) {
  e.preventDefault();
  const email = $('#logEmail').val();
  const password = $('#logPassword').val();


  sessionStorage.setItem("email", email);
  newpage = this.href;


  $.get("/login", {
    email,
    password
  }, function(data) {
    //let newWin = window.open(newpage)
    //window.open('login.html', '_self', '');
    //window.close();
    //newWin.onload();
    document.open('index.html', '_self', '');
  });
});


/*! Fades out the whole page when clicking links */
$('#logout').click(function(e) {
  e.preventDefault();
  sessionStorage.setItem("email", "");
  Clear();
  newLocation = this.href;
  $('body').fadeOut('slow', newpage);
});

function newpage() {
  window.location = newLocation;
}

$(document).ready(function() {

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
  $.post("/users", {
    name,
    lastName,
    email,
    password
  }, function(data) {

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

  $.post("/posts", {
    email,
    title,
    description
  }, function(data) {
    document.getElementById("user_email").textContent;
    $('#title').val();
    $('#message').val();
    console.log(data);
    loading(data);
  });

  $('#title').val('');
  $('#message').val('');
  Recent();
});
