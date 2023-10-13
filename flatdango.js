
document.addEventListener('DOMContentLoaded',()=>{
    const moviesList=document.getElementById('movies-list')
    const poster=document.getElementById('movie image')
    const movieTitle=document.getElementById('movie title')
    const runtime=document.getElementById('runtime')
    const showTime=document.getElementById('showtime')
    const description=document.getElementById('description')
    const availableTickets=document.getElementById('available tickets')
    const buyTicketButton=document.getElementById('buy ticket')
    
    fetch('http://localhost:3000/films')
    .then(response=>response.json())
    .then(moviesData=>{
        moviesData.forEach(movie=> {
            const movieItem=document.createElement('li')
            movieItem.textContent=movie.title

            movieItem.addEventListener('click',function(){movieDetails(movie)})
            moviesList.appendChild(movieItem)
            
        });
        movieDetails(moviesData[0])
    })
    function movieDetails(movie){
        movieTitle.textContent=movie.title
        runtime.textContent=movie.runtime
        showTime.textContent=movie.showtime
        description.textContent=movie.description
        poster.src=movie.poster
        const remainingTickets=movie.capacity-movie.tickets_sold
        availableTickets.textContent=remainingTickets<0?'No tickets available':remainingTickets
        if(remainingTickets<=0){
            buyTicketButton.disabled=true
        }
        else{
            buyTicketButton.disabled=false
        }
        buyTicketButton.addEventListener('click', function () {
            if (remainingTickets > 0) {
                movie.tickets_sold += 1;
                movieDetails(movie);}
            })


    }
    
})