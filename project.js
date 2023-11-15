
let sorterEnabled=false;
let taskArray=[];
let position=0;
let images=document.querySelectorAll('img');
let deleterImages=document.querySelectorAll('.tasks .task img');
let deleteButton=document.querySelectorAll('.deleteButton');
let inputClear=document.getElementById('inputClear');
let submitButton=document.querySelector('.submitField');
let input=document.querySelector('input');
let sorter=document.querySelector('.sorter');
let allTasks=document.querySelector('.tasks');





let draggedItem = null;

// Add event listeners for drag and drop events

allTasks.addEventListener('dragstart', handleDragStart);
allTasks.addEventListener('dragover', handleDragOver);
allTasks.addEventListener('drop', handleDrop);

images.forEach(x=>{
  x.setAttribute('draggable', false);
})





submitButton.addEventListener('click',()=>{
    let inputValue=input.value; 
  
    if(inputValue!=''){ 
      sorterEnabled=true;
      taskArray.push(inputValue);
      let img=addArraytoHtml(inputValue);

    img.addEventListener('click',(e)=>imageClickListener(e.target));
    input.value='';
    }

    




  
})


sorter.addEventListener('click',(e)=>{

  if(sorterEnabled){
  let flag=(String(e.target.src)).includes("74.svg");

  

  if(flag){
    
 taskArray = orderDescending(taskArray);
 e.target.src='images/Group 90.svg';

}


  else{
  
    taskArray = orderAscending(taskArray);
    e.target.src='images/Group 74.svg';

  }

  position=0;
  allTasks.innerHTML='';
   taskArray.forEach(x=>{
    let img=addArraytoHtml(x);
    img.addEventListener('click',(e)=>{
      imageClickListener(e.target )})
   })
  




  
  }
 
})




    deleteButton.forEach(x=>x.addEventListener('mouseover',(e)=>{
        msIn(e.target);
    }));
  
  deleteButton.forEach(x=>x.addEventListener('mouseout',(e)=>{
    
      msOUT(e.target);}
   

    ));



  inputClear.addEventListener('click',()=>{
    input.value='';
  });



      function msIn(t){
      t.src="images/Group 70.svg";

      }

    function msOUT(t){
    t.src="images/Group 56.svg";
    
    }



    function orderAscending(array){
        array.sort((a,b)=>{
          return a.localeCompare(b);
        }
        )
        return array;
       }

       
       
       function orderDescending(array){
        array.sort((a,b)=>{
          return -(a.localeCompare(b));
        }
        )
        return array;
       }
       




        function addArraytoHtml(x){
          
      
    
          let taskField=document.createElement('div');
          taskField.classList.add('task');
            
          
          let image=document.createElement('img');
          image.src='images/Group 56.svg';
          image.classList.add('deleteButton','removebutton');
          image.setAttribute('draggable', false);
          image.setAttribute('data-position', position);
        
          let task=document.createElement('p'); 
          task.classList.add('taskp');
          task.innerHTML =x;
          taskField.appendChild(task);
          
          taskField.appendChild(image);
          
          
          allTasks.appendChild(taskField);
      taskField.setAttribute('draggable',true);
      
      
      image.addEventListener('mouseover', () => {
            msIn(image);
        });
        
          
        image.addEventListener('mouseout', () => {
          msOUT(image);
        });

        
        position++;
      return image;
        
        }

          

     

 function imageClickListener(image){


    position=0;
  allTasks.innerHTML='';
  const imagePosition = image.getAttribute('data-position');
  
 taskArray.splice(imagePosition,1);

 taskArray.forEach((x) => {
  let img = addArraytoHtml(x); 
  img.addEventListener('click', ()   => imageClickListener(img));
  position++;
});
 
 }









   
    // Drag start event handler
    function handleDragStart(event) {
      draggedItem = event.target;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', draggedItem.innerHTML);
      event.target.style.opacity = '0.5';
    }

    // Drag over event handler
    function handleDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      const targetItem = event.target;
      if (targetItem !== draggedItem && targetItem.classList.contains('task')) {
        const boundingRect = targetItem.getBoundingClientRect();
        const offset = boundingRect.y + (boundingRect.height / 2);
        if (event.clientY - offset > 0) {
          targetItem.style.borderBottom = 'solid 2px #ffffff';
          targetItem.style.borderTop = '';
      
        } else {
          targetItem.style.borderTop = 'solid 2px #ffffff';
          targetItem.style.borderBottom = '';
          
        }
      }
    }

    // Drop event handler
    function handleDrop(event) {
      event.preventDefault();
      const targetItem = event.target;
      if (targetItem !== draggedItem && targetItem.classList.contains('task')) {
        if (event.clientY > targetItem.getBoundingClientRect().top + (targetItem.offsetHeight / 2)) {
          targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
        } else {
          targetItem.parentNode.insertBefore(draggedItem, targetItem);
        }
      }
      
      targetItem.style.borderTop = '';
      targetItem.style.borderBottom = '';

      draggedItem.style.opacity = '';
      draggedItem = null;
    }


  