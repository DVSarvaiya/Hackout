self.addEventListener("push",(event)=>{
    const data = event.data.json();
    self.ServiceWorkerRegistration.showNotofication(data.title,{
        body:data.body
    })
})