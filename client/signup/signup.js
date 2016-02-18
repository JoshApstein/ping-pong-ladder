$('document').ready(function() {
  $('#signup').on('submit', function(e) {
    e.preventDefault();
    if($('#first') === '') aler('please fill all forms');
    var newUser = {
      firstName : $('#first').val(),
      lastName : $('#last').val(),
      userName : $('#user').val(),
      password : $('#pass').val()
    };
    newUser = JSON.stringify(newUser);
    $.ajax({
      type:'POST',
      data: newUser,
      url: '/signup',
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        if (typeof data.redirect == 'string')
          window.location = data.redirect;
      }
    });
    // $.post('/signup', newUser)
  });
});
