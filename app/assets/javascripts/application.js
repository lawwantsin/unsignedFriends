// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '{your-app-id}',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    FB.api('/me', function(user) {
      $('#status').html('Thanks for logging in, ' + user.name + '.  Loading names.');
      FB.api("/me/taggable_friends",
      function (response) {
        if (response && !response.error) {
          var params = $.map(response.data, function(x) {
            return {
              name: x.name,
              photo: x.picture.data.url
            }
          });
          // pic = 'http://graph.facebook.com/lawrence.whiteside/picture?type=normal';
          // var params = [
          //   {name: "John biber", fbId: '2323', photo: pic},
          //   {name: "Brook Taylor", fbId: '2323', photo: pic},
          //   {name: "joshua hill", fbId: '2323', photo: pic}
          // ]
          $('.searching').show();
          params.push({
            name: user.name,
            photo: 'http://graph.facebook.com/'+user.id+'/picture?type=square'
          })
          $.ajax(
            {
              type: "POST",
              url: '/match_to_list',
              data: JSON.stringify({friends: params}),
              complete: function(res) {
                make_list(res.responseText)
              },
              dataType: 'json',
              contentType: 'application/json'
            }
          );
        }
      });
    });
  }

  make_list = function(res) {
    $('.searching').hide();    
    if (res.length > 0) {
      $('.matched-list').append(res);
      $('.found-some').show();
    }
    else {
      $('.found-none').show();
    }
  } 
