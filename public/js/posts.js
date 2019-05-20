let recent_id = new Array();
//let personal_posts = new Array();

async function getid(){
  $.get("/postsRecent", {}, function(data) {
    //console.log('recent_id');
    for (i = 0; i <= 2; i++) {
      recent_id[i] = data[i]._id;
      console.log(recent_id[i]);
        }
  });
};

  function read1() {
    console.log(recent_id[0]);
    readMore(recent_id[0]);
  };

  function read2() {
    //e.preventDefault();
    readMore(recent_id[1]);
  };

  function read3() {
    //e.preventDefault();
    readMore(recent_id[2]);
  };


// $('#read1').click(function(e) {
//   e.preventDefault();
//   console.log(recent_id[0]);
//   readMore(recent_id[0]);
// })
//
// $('#read2').click(function(e) {
//   e.preventDefault();
//   readMore(recent_id[1]);
// })
//
// $('#read3').click(function(e) {
//   e.preventDefault();
//   readMore(recent_id[2]);
// })


function readMore(_id) {
console.log(_id);
  $.get("/postByID", {
    _id
  }, function(data) {
       let newWin = window.open('post.html')
      newWin.onload = function() {
      console.log('here');
      let ident = newWin.document.getElementById('heading');
      console.log(data.title);
      ident.innerHTML = data.title;
      newWin.document.getElementById('text').append(`${data.description}`);

      // let blog = newWin.document.createElement("DIV");
      // let title = newWin.document.createElement("H1");
      // let body = newWin.document.createElement("P");
      // title.innerHTML = data.title;
      // body.append(`${data.description}`);
      // blog.appendChild(title);
      // blog.appendChild(body);
      // newWin.document.getElementById('general').appendChild(blog);
    };
  });
};
