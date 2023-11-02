
let taskArray=[];
let position=0;
let images=document.querySelectorAll('img');
let deleterImages=document.querySelectorAll('.tasks .task img');

images.forEach(x=>{
  x.setAttribute('draggable', false);
})

let deleteButton=document.querySelectorAll('.deleteButton');
let inputClear=document.getElementById('inputClear');
let submitButton=document.querySelector('.submitField');
let input=document.querySelector('input');
let sorter=document.querySelector('.sorter');
let allTasks=document.querySelector('.tasks');



submitButton.addEventListener('click',()=>{
    let inputValue=input.value; 
  
    if(inputValue!=''){ taskArray.push(inputValue);
      let img=addArraytoHtml(inputValue);

    img.addEventListener('click',(e)=>imageClickListener(e.target))
    }
 
   
    




  
})


sorter.addEventListener('click',(e)=>{
  let flag=e.target.src=="http://127.0.0.1:5500/images/Group%2074.svg";

  allTasks.innerHTML='';

  if(flag){
    
 taskArray = orderDescending(taskArray);
 e.target.src='images/Group 90.svg';
 console.log(taskArray)
taskArray.forEach(x=>{
addArraytoHtml(x);

})
}


  else{
  
    taskArray = orderAscending(taskArray);
    e.target.src='images/Group 74.svg';
    console.log(taskArray)
    taskArray.forEach(x=>{
      addArraytoHtml(x);
     
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
        
        if(x!='none'){
        console.log(taskArray);
   
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
    
        image.addEventListener('mouseover', () => {
          msIn(image);
      });
      
        
      image.addEventListener('mouseout', () => {
         msOUT(image);
      });
    
    return image;
       
      }

        }

     

 function imageClickListener(image){


    
  allTasks.innerHTML='';
  const imagePosition = image.getAttribute('data-position');
 taskArray[imagePosition]='none';
 
 taskArray.forEach(x=>{addArraytoHtml(x);  position++;}  )


 }
