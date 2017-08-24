// create quiz object
var questions = [{ 
  question: "What is 2*5?",
  choices:[2,10,5,8],
  correctAnswer:10
}, {
  question: "What is 2*4?",
  choices:[2,10,4,8],
  correctAnswer:8	
}, {
  question: "What is 7+4?",
  choices:[1,7,3,11],
  correctAnswer: 11
}];

var selections = [];
var holdSelect = [];
var correctCnt = 0;
var wrongCnt   = 0;
var time = 30
var intervalId;

$("#start").click(generateQuiz);




function generateQuiz() {

   intervalId = setInterval(runTimer,1000);	
   
   $(".content").empty();
   var a = $("<form>").addClass("question").attr("name","theForm")

   for (var i = 0; i < questions.length; i++) {
      
       var a1 = $("<p>").text(questions[i].question);
       a1.append("<br>"); 

       for (var z = 0; z < questions[i].choices.length ; z++) {

           var b = $("<input/>").attr("type","radio").attr("value",questions[i].choices[z])
           b.attr("name","radio" + i)


           var c = $("<label>").text(questions[i].choices[z]);
                 	   
       	   a1.append(c).append(b);
       }
 
       a.append(a1);
      
   }

   var c = $("<input>").attr("type","button").attr("value","Submit Quiz");
   c.addClass("subButton")
   a.append(c);

   $(".content").append(a);
 
   $(".subButton").click(function(e) {
	e.preventDefault();

	generateScore();
});

};



function generateScore() {

    console.log("we made it");

    
   
   for (var x = 0; x < questions.length; x ++) {
   	
   	  if (x === 0) {
   	   selections[x] = $('input[name="radio0"]:checked').val(); 
       console.log(selections);
      }

      else if (x === 1) {
      selections[x] = $('input[name="radio1"]:checked').val(); 
      console.log(selections);
      }
      else if (x === 2) {
      selections[x] = $('input[name="radio2"]:checked').val(); 
      console.log(selections);	
      }

    }
    
    for (var w = 0; w < questions.length; w++) {


      console.log(questions[w].correctAnswer)
      if (parseInt(selections[w]) == (questions[w].correctAnswer)) {
      	correctCnt++
      }
      else {
      	wrongCnt++;
      }

   }

   stop();
  
};

function runTimer(){

	time--
	$(".timer").html("time left: " + time);

	if (time === 0) {
		stop();
		alert("Time's Up! You Lose!");
	}
}

function stop(){
	clearInterval(intervalId);
	$(".content").empty();
       var g = $("<div>").addClass("result-area")
       g.text("Score: " + correctCnt + " / " + questions.length); 

       var h = $("<input>").attr("type","button").attr("value","Try Again");
       h.addClass("resetButton")
       ;

   $(".content").html(g).append("<br>").append(h); 

   $(".resetButton").click(function(e) {
	e.preventDefault();
    time = 30;
	generateQuiz();      
   });
}
