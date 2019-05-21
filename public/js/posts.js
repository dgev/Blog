let title = localStorage.getItem("recent_title");
let body = localStorage.getItem("recent_body");
let begin = localStorage.getItem("begin");

  if(begin === ''){ 
      document.getElementById('heading').innerHTML = title; 
      document.getElementById('text').append(`${body}`);
}   
