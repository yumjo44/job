const jobsContainer = document.querySelector("#jobs")
const searchField=document.querySelector("#search")
const searchform=document.querySelector("#search-form")
const modeToggle=document.querySelector("#mode-toggle")
const html=document.body.parentElement
const navbar=modeToggle.parentElement.parentElement

const renderJobs = async(term)=>{

    let res 
    if(term){
      res=await fetch (`https://jobs.cb-ashik.me/jobs/search/${term}`).then(res=>res.json())

    }else{
      res=await fetch (`https://jobs.cb-ashik.me/jobs`).then(res=>res.json())

}
    if(res && res.length>0){
        res.forEach((job)=>{
            const jobCard=document.createElement("div")
            jobCard.classList.add( "col-md-4","my-3",)
            jobCard.innerHTML=`
           <div class="card">
           <div class="card-body">
           <div class=" rounded d-flex justify-content-center align-items-center " style="width: 50px; height: 50px; margin-top: -30px; background-color:${ job.logoBackground}">
            
              <img
                src="${job.logo}"
                alt=""
              />
            </div>
            <p class="my-2 text-secondary-emphasis">
              <span>${job.postedAt}</span>
  
              <i class="bi bi-dot"></i>
              <span> ${job.contract}</span>
            </p>
            <h3 class="card-tittle fs-5 fw-medium">
              ${job.position}
            </h3>
            <p class="text-secdary-emphasis">${job.company}</p>
            <p class="text-primary fw-bold">${job.location}</p>
          </div>
           </div>

            `;
            jobsContainer.appendChild(jobCard)
           
        })
    }
    
    
}
searchform.addEventListener("submit",(e)=>{
  e.preventDefault()
  const term=searchField.value
  jobsContainer.innerHTML=""
  renderJobs(term)
})
modeToggle.addEventListener("click",function(e){
  e.preventDefault()
 changeTheme()
  }
 
  
)
const changeTheme=()=>{
  const theme =localStorage.getItem("theme")||"light"
  if(theme==="light"){
    html.setAttribute("data-bs-theme","dark")
    localStorage.setItem("theme","dark")
    modeToggle.innerHTML=`<i  class="bi bi-brightness-high-fill"></i>`
   

  }else{
    html.setAttribute("data-bs-theme","light")
    localStorage.setItem("theme","light")
    modeToggle.innerHTML=`
    <i class="bi bi-moon-fill"></i>`
}
  
}
const storageTheme=localStorage.getItem("theme")||"light"
html.setAttribute("data-bs-theme",storageTheme)
if (storageTheme==="dark"){
  madeToggle.innerHTML=`<i  class="bi bi-brightness-high-fill"></i>`
} else{
  modeToggle.innerHTML=`<i class="bi bi-moon-fill"></i>`
}






renderJobs()