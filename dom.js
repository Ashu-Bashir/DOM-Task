const publishPostBtn = document.querySelector("#publishPost");
const viewPostBtn = document.querySelector("#viewPost");
const publishPostInputs = document.querySelector("#publishPostInputs");
const titleInput = document.querySelector("#title");
const bodyInput = document.querySelector("#body");
const heading = document.querySelector("#headingResult");
const viewPostList = document.querySelector("#viewPostList");
const titleHeading = document.querySelector("#titleHeading");
// const submitBtn = document.querySelector("#submitPost");
// const editBtn = document.querySelector("#editBtn");
// const deleteBtn = document.querySelector("#deleteBtn");
// const saveBtn = document.querySelector("#saveBtn");



const hidePostMessage = () => {
    setTimeout(() => {
      heading.innerHTML =`<h4><i>You can view the request by clicking View Post</i></h4>`;
      viewPostBtn.disabled= false;

    }, 3000); 
  }

publishPostBtn.addEventListener("click" , (e)=>{
    e.preventDefault();
    publishPostInputs.hidden = false;
    const submitBtn = document.querySelector("#submitPost");


submitBtn.addEventListener("click" , async (e)=>{
    e.preventDefault();
    if (titleInput.value === "" && bodyInput.value === "") {
        heading.innerHTML = "Please enter the credentials"
        return    
    }

    try {
        submitBtn.disabled= true;
        const response = await fetch('https://jsonplaceholder.typicode.com/posts' , {
            method: "POST", 
            headers : {
                'Content-type': 'application/json; charset=UTF-8',
                        },
            body : JSON.stringify({
                title: titleInput.value , 
                body : bodyInput.value , 
            })
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          
          const data = await response.json();
          heading.innerHTML = `<h4><i>Request was successful</i></h4>`
          publishPostInputs.hidden = true;
          viewPostBtn.disabled = true 
          hidePostMessage();

          // ADDING VIEW POST BUTTON
           viewPostBtn.addEventListener("click" , (e)=>{
               e.preventDefault();
               
              viewPostList.hidden = false;
              heading.innerHTML= "" 
              titleHeading.innerHTML = `The Title is <i><b>${data.title}</b></i>`
            });
               const editBtn = document.querySelector("#editBtn");
               const deleteBtn = document.querySelector("#deleteBtn");
                  
               //ADDING DELETE BUTTON TO DELETE THE LOG
                    const hideDeleteMessage = () => {
                        setTimeout(() => {
                        heading.innerHTML = "";
                        }, 3000); 
                    }

                    deleteBtn.addEventListener("click", async (e) => {
                        e.preventDefault();
                    
                        try {
                            deleteBtn.disabled = true;
                        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`,{
                            method: "DELETE",
                            }
                        );
                    
                        if (response.ok) {
                            heading.innerHTML = "The log is Deleted";
                            viewPostList.hidden = true;
                            viewPostBtn.disabled = true;
                            submitBtn.disabled= false;
                            titleInput.value= "";
                            bodyInput.value = "";
                            hideDeleteMessage();
                            deleteBtn.disabled = false;
                            viewPostBtn.hidden = false;
                            submitBtn.hidden = false


                        }
                        } catch (error) {
                        console.error( error);
                        }
                    });


                    // ADDING EDIT BUTTON TO EDIT THE DATA
                    editBtn.addEventListener("click" , (e)=>{
                        const saveBtn = document.querySelector("#saveBtn");
                        e.preventDefault();
                        titleInput.value = data.title;
                        bodyInput.value = data.body;
                        publishPostInputs.hidden = false;
                        submitBtn.hidden = true;
                        viewPostBtn.hidden = true;
                        viewPostList.hidden = true;
                        saveBtn.hidden = false;
                        saveBtn.disabled= false;


                        saveBtn.addEventListener("click" , async(e)=>{
                            e.preventDefault();
                            try {
                                saveBtn.disabled = true;
                                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1` , {
                                    method: "PUT",
                                    headers: {
                                    "Content-type": "application/json; charset=UTF-8",
                                    },
                                    body: JSON.stringify({
                                    title: titleInput.value,
                                    body: bodyInput.value,
                                    }),
                                });
                                const updatedData = await response.json();
                                viewPostList.hidden = false;
                                titleHeading.innerHTML = `The Title is <i><b>${updatedData.title}</b></i>`;
                                saveBtn.hidden= true;
                                publishPostInputs.hidden = true;
                                data.title = updatedData.title;
                                data.body= updatedData.body;
                                saveBtn.disabled = false
                                
                            } catch (error) {
                                console.error(error);
                            }
                        });
                    });
            
        
    } 
    catch (error) {
        console.error(error);
    }

});

});


