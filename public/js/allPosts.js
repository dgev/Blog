$.get("/posts", {}, function(data) {
  data.forEach(element => {
    let blog = document.createElement("DIV");
    let title = document.createElement("H1");
    let body = document.createElement("P");
    title.innerHTML = element.title;
    body.append(`${element.description}`);
    blog.appendChild(title);
    blog.appendChild(body);
    document.getElementById('general').appendChild(blog);
  })

});
