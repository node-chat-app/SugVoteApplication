$(document).ready(() => {
  setTimeout(()=>{
    $("#success_msg").remove();
  }, 2000);
  
  setTimeout(()=>{
    $("#error_msg").remove();
  }, 2000);


//adminRoute  for ajax to add, remove, or view users
$("#howItWork").click(howItWorks);
$("#userLogin").click(userLogin);
  $("#addUser").click(addUser);
  $("#getAUser").click(getAUser);
  $("#uploadImage").click(upLoadImage);
  $("#addcontestantsname").click(addcontestantsname);
  $("#addVoteDates").click(addVoteDates);
 });
     function howItWorks(){
      $("#homeDiv").load('./AdminhtmlFolder/howItWorks.html');
      $("#homeDiv").css("background-color", "purple");
    }

    function userLogin(){
      $("#homeDiv").load('./AdminhtmlFolder/userLogin.html');
      $("#homeDiv").css("background-color", "purple");
    }

function addUser(){
  $("#adminDiv").load('./admin.html .addForm');
}

function getAUser(){
  $("#adminDiv").load('./admin.html .getAUserForm');
}

function upLoadImage(){
  $("#adminDiv").load('./admin.html #imageUpload');
}

function addcontestantsname(){
  $("#adminDiv").load('./admin.html #addcontestantsname');
}

function addVoteDates(){
  $("#adminDiv").load('./admin.html #addDatesVote');
}