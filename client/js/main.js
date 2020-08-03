const unsplasht = document.querySelector('.unsplasht');
const unsplash = document.querySelector('.unsplash');
const cont = document.querySelector('.cont');
const img = document.querySelector('.unsplashimages');


unsplasht.addEventListener('click',(e)=>{
  e.preventDefault()
  unsplash.style.display = 'block'
})


cont.addEventListener('click',(e)=>{
  e.preventDefault()
  img.style.display = 'flex'
})