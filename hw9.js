// const inquirer = require('inquirer');
// const html_pdf = require('html_pdf');
// const fs = require('fs');

// pdf.create(outputHTML, options).toFile('./businesscard.pdf', function(err, res) {
//     if (err) return console.log(err);
//     console.log(res); // { filename: '/app/businesscard.pdf' }
//   });

const axios = require("axios");
var username = "cjmendez26";
// axios.get("https://api.github.com/users/" + username + "/repos")
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//  });
// axios.get("https://api.github.com/images/error/" + username + "/gif")
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
axios.get("https://api.github.com/users/" + username + "/followers")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
axios.get("https://api.github.com/users/" + username + "following{/other_user}")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  axios.get("https://api.github.com/users/" + username + "starred{/owner}{/repo}")
  .then(function (response) {
    console.log(response);
  })
    .catch(function(error){
      console.log(error);
  });


