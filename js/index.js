const easy = [
	"6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
	"685329174971485326234761859362574981549618732718293465823946517197852643456137298"
  ];
  const medium = [
	"--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
	"619472583243985617587316924158247369926531478734698152891754236365829741472163895"
  ];
  const hard = [
	"-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
	"712583694639714258845269173521436987367928415498175326184697532253841769976352841"
  ];


  var timer;
  var timereamaining;
  var selectedNum;
  var selectedTile;
  var disableSelect;

  //stopwatch variables
  let h =0;
  let m = 0;
  let s = 0;
  let st;


  window.onload = function(){
	  //run when new game buttom is clicked 
	  id("start-btn").addEventListener("click", startGame);

	  //add event listener to the button
	  id("solve-one").addEventListener("click",function(){
		//check for the selected tile
		if(selectedTile == null)
		alert("Chose a cell!");
		else {
			disableSelect = true;
		    selectedTile.textContent = easy[1].charAt(selectedTile.id);
			selectedTile.classList.add("one-step");
			setTimeout(function(){
				disableSelect = false;
			
			selectedTile.classList.add("one-step-solve");

			selectedTile = null;
		 },1000);
		}
	});

	  //add event listener to the numbers and the number container
	  for(let i = 0; i<id("number-container").children.length; i++){
          id("number-container").children[i].addEventListener("click",function(){
			  
			//if selecting is not disabledd
			if(!disableSelect){
				//if number is already selected
				if(this.classList.contains("selected")){
					//then remove this selection
					this.classList.remove("selected");
					selectedNum = null;
				}
				else{
					//deselect all other numbers
					for(let i=0;i<9;i++){
						id("number-container").children[i].classList.remove("selected");
					}
					//select it and update selectedNum
					this.classList.add("selected");
					selectedNum = this;
					updateMove();
				}
			}
		 });
		 
	  }
  }

  function startGame(){
	  //Chose difficulty
	  let board;
	  if((id("diff-1").checked == false) && (id("diff-2").checked == false) && (id("diff-3").checked == false)){
		  alert("Chose a difficulty level");
	  } 
	  else if (id("diff-1").checked) board = easy[0];
	  else if(id("diff-2").checked) board = medium[0];
	  else board = hard[0];
	  

	  disableSelect = false;

	  //create board
	  generateBoard(board);


	  //starts timer
      if(id("time-4").checked){
          id("timer").classList.add("hidden");
          startClock();
      }
      else
	  {
          id("displayTime").classList.add("hidden");
          startTimer();
      }

	  //sets theme based on input
	  if((id("theme-1").checked == false) && (id("theme-2").checked == false)){
		  qs("body").classList.remove("dark");
	  }else{
	  if(id("theme-1").checked){
		  qs("body").classList.remove("dark");
	  }
	  else{
		  qs("body").classList.add("dark");
	  }
	}
	
	//show number container
	id("number-container").classList.remove("hidden");

	id("solve-one").classList.remove("hidden");

  }

  function startTimer(){
      //sets time remaining based on input
      id("timer").classList.remove("hidden");
      
	  if(id("time-1").checked) timereamaining = 180;
	  else if(id("time-2").checked) timereamaining = 300;
	  else timereamaining = 600;

	  //sets timer for the first second
	  id("timer").textContent = timeConversion(timereamaining);

	  //sets timer to update every second
	  timer = setInterval(function(){
		  timereamaining--;
		  //if no time remaining
		  if(timereamaining == 0) endGame();
		  id("timer").textContent = timeConversion(timereamaining);
	  },1000)
  }

  //converts seconds into string of mm:ss format
  function timeConversion(time){
	  let minutes = Math.floor(time/60);
	  if(minutes < 10) minutes = "0" + minutes;
	  let seconds = time % 60;
	  if(seconds < 10) seconds = "0" + seconds;
	  return minutes + ":" + seconds;
  }

  function generateBoard(board){
	  //Clear previous board
	  clearPrevious();

	  //used to increment tile ids
	  let idCount = 0;
	  for(let i=0;i<81;i++){
		  //Create a new paragraph element
		  let tile = document.createElement("p");
		  if(board.charAt(i)!="-"){
			  //set tile text to the correct number
			  tile.textContent = board.charAt(i);
		  } else{
			  //Add click event listener to tile
			  tile.addEventListener("click",function(){
				 //if selecting is not disabled
				 if(!disableSelect){
					 //if the tile is already selected
					 if(tile.classList.contains("selected")){
						 //then remove selection
						 tile.classList.remove("selected");
						 selectedTile = null;
					 }
					 else{
						 //deselect all selected tiles
						 for(let i=0;i<81; i++){
							 qsa(".tile")[i].classList.remove("selected");
						 }
						 
						 //add selection and update variable
						 tile.classList.add("selected");
						 selectedTile = tile;
						 updateMove();
					 }
				 }
			  });
		  }
		  //Assign tile id
		  tile.id = idCount;
		  //Increment for next tile
		  idCount++;
		  //add tile class to all the tiles
		  tile.classList.add("tile");
		  if((tile.id>17 && tile.id<27)||(tile.id>44 && tile.id<54)){
			  tile.classList.add("bottomBorder");
		  }
		  if((tile.id + 1)% 9 == 3 || (tile.id + 1)% 9 == 6){
			  tile.classList.add("rightBorder");
		  }
		  //add tile to board
		  id("board").appendChild(tile);
	  }
  }

  function updateMove(){
	  //if a tile and a number is selected
	  if(selectedTile && selectedNum){
		  //set the tile to the correct number
		  selectedTile.textContent = selectedNum.textContent;

		  //if number matches the solution key
		  if(checkCorrect(selectedTile)){
              //deselect the tiles
              disableSelect = true;
              selectedTile.classList.add("correct");

              setTimeout(function(){
                  disableSelect = false;
              selectedTile.classList.remove("correct");
			  selectedTile.classList.remove("selecetd");
              selectedNum.classList.remove("selected");
              selectedTile.classList.add("correctTile")
			  
			  //clear the selected variables
			  selectedNum = null;
			  selectedTile = null;
			  },1000);
			  
			  //check is user is done
			   if(checkDone(selectedTile))
			   {
				   endGame();
			   }
		  }
		  //if the number does not match the solution key
		  else{
			  //disable selecting new numbers for 1 second
			  disableSelect = true;
			  //make the tile turn red
			  selectedTile.classList.add("incorrect");

			  //run after 1 second
			  setTimeout(function(){

                disableSelect = false;

				 //restore tile colour and remove selected from both
				 selectedTile.classList.remove("incorrect");
				 selectedTile.classList.remove("selected");
				 selectedNum.classList.remove("selected");

				 //clear the tiles text and clear tile 
				 selectedTile.textContent = "";
				 selectedTile = null;
				 selectedNum = null;
			  },1000);
		  }
	 
		}
  }
  
	  
  function checkCorrect(tile){
	  //set solution based on difficulty 
	  let solution;
	  if(id("diff-1").checked) solution = easy[1];
	  else if(id("diff-2").checked) solution = medium[1];
	  else solution = hard[1];

	  //if tiles number is equal to solution number
	  if(solution.charAt(tile.id) === tile.textContent) return true;
		 else return false;

  }

  function clearPrevious(){
	  //Access all the tiles
	  let tiles = qsa(".tile");

	  //Remove each tile
	  for(let i=0; i<tiles.length;i++)
	  {
		  tiles[i].remove();
	  }
	  //remove timer if there
	  if(timer) clearTimeout(timer);
	  if(st) clearTimeout(st);

	  //deselect any numbers from number-container
	  for(let i=0; i<id("number-container").children.length;i++){
		  id("number-container").children[i].classList.remove("selected");
	  }

	  //Clear selected variables
	  selectedTile = null;
	  selectedNum = null;
  }

  function endGame()
  {
	  //Disable moves and stop timer
	  disableSelect = true;
	  clearTimeout(timer);
	  clearTimeout(st);

	  //Display player lost
	  if(timereamaining == 0)
	  alert("you lost!");
      else if(id("time-4").checked)
      {
		 // stopWatch();
          alert("You won! Finished board in "+h+" hours "+m+" minutes and "+s+" seconds!");
      }
      else alert("You won!");

  }

  function checkDone(){
	  let tiles = qsa(".tile");
	  for(let i=0;i<tiles.length;i++){
		  if(tiles[i].textContent === "") return false;
	  }
	  return true;
  }

  function startClock(){
	  id("displayTime").classList.remove("hidden");
	  resetClock();
	  st = setInterval(clock,1000);
  }

  function clock(){
	  s++;
	  if(s/60===1){
		  s=0;
		  m++;

		  if(m/60===1){
			  m=0;
			  h++;
		  }
	  }
	  if(s<10){
		  second="0"+s.toString();

	  }else{
		  second = s;
	  }

	  if(m<10){
		  minute="0"+m.toString();
	  }else{
		  minute=m;
	  }
	  if(h<10){
		  hour="0"+h.toString();
	  }else{
		  hour=h.toString();
	  }
	  id("displayTime").textContent = hour+":"+minute+":"+second;
	  
  }

  function resetClock()
  {
	  clearInterval(st);
      h=0;
      m=0;
      s=0;
      id("displayTime").textContent = "00:00:00";
  }


   //Helper functions

  function id(id){
	  return document.getElementById(id);
  }

  function qs(selector){
	  return document.querySelector(selector);
  } 

  function qsa(selector){
	  return document.querySelectorAll(selector);
  }