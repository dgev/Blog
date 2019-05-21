$("#signup").click(function() {  
  $("#first").fadeOut("fast", function() {
    $("#second").fadeIn("fast");
  });
});

$("#signin").click(function() {
  $("#second").fadeOut("fast", function() {
    $("#first").fadeIn("fast");
  });
});

$("#sign").click(function() {
  const name = $('#firstname').val();
  const lastName = $('#lastname').val();
  const email = $('#userEmail').val();
  const password = $('#userPassword').val();
  $.get("/UserByEmail", {
    email
  }, function(data) {
    if(data.email === email){
      alert("Account with this email already exists");
    }
    else if(!name || !lastName || !email || !password){
      alert("All fields are required to input :)");
    }
    else{
    $("#second").fadeOut("fast", function() {
      $("#first").fadeIn("fast");
    });
  }
  });
});
