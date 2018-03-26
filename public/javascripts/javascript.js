$(document).ready(function(){


})

function press(){
  var url = "/Send_Message";
           //  alert(JSON.stringify(data));
           var message =document.getElementsByName("message")[0].value;
             $.ajax({
               url: url,
               type: 'POST',
               data: JSON.stringify({result: {
                parameters: {
                  echoText: message
                }
              }}),
               contentType: 'application/json',
               success: function(data){
                 console.log(data.speech)
                 var s = document.getElementById("bot");
                  s.value = data.speech;

               }
           })
}
