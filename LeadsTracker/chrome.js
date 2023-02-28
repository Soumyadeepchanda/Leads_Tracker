let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById('input-btn')
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById('delete-btn')
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
//GRAB THE SAVE TAB BUTTON AND STORE IT IN A TABBTN VARIABLE
const tabBtn=document.getElementById("tab-btn")
if(leadsFromLocalStorage){
	myLeads=leadsFromLocalStorage
	render(myLeads)
}


tabBtn.addEventListener("click",function(){
	//to get the current tab from chrome
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		myLeads.push(tabs[0].url)
		localStorage.setItem("myLeads",JSON.stringify(myLeads))
		render(myLeads)
	})
})


function render(leads){
let listItems=""
for(let i=0;i<leads.length;i++){
	//listItems+="<li><a target='_blank'href='"+myleads[i]+"'>"+myLeads[i]+"</a></li>"
	listItems+=`
		<li>
			<a target='_blank' href='${leads[i]}'>
			${leads[i]}
			</a>
		</li>
		`
}
ulEl.innerHTML=listItems
}

//Listen to double clicks on the delete button 
//When clicked clear localstorage,myleads, and the DOM
deleteBtn.addEventListener("dblclick",function(){
	localStorage.clear()
	myLeads=[]
	render(myLeads)
})
 

//good way to 
inputBtn.addEventListener("click",function(){ 
	myLeads.push(inputEl.value)
	inputEl.value=""

	localStorage.setItem("myLeads",JSON.stringify(myLeads))

	render(myLeads)
})



//ulEl.innerHTML+= "<li>"+myLeads[i]+"</li>"
	//other way off doing the above code
	// const li=document.createElement("li")
	// li.textContent=myLeads[i]
	// ulEl.append(li)