const card = document.querySelector('.card');
const input = document.getElementById('search');
const colors = {
   fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_type = Object.keys(colors);

const fetchPokemon = async () => {
   for(i=1; i<=150; i++){
      const urls = [`https://pokeapi.co/api/v2/pokemon/${i}`];

      await Promise.all(urls.map(url=>
         fetch(url)
         .then(res=>res.json())
         ))
         .then (data => {
         data.map(user=>{
            const pokemon = {
               name: user.name,
               id: user.id,
               type: user.types.map(type => type.type.name).join(',')
            };
            pokemonCard(pokemon);
         })
      })
   }
}

const pokemonCard = (pokemon) => {
   // create new element
   const el = document.createElement('div');
   // add class to new element
   el.classList.add('dib','grow','ma3','pa3','br4');
   // Make pokemons name first letter uppercase
   pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
   // get the type of pokemon from color variable
   const type = main_type.find(
      type => pokemon.type.indexOf(type) > -1
   );
   // Make bg color of every card the color from color variable
   const color = colors[type];
   el.style.backgroundColor = color;

   el.innerHTML = `
      <div class='img_container'>
         <img src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png' alt='pokemon img'/>
      </div>
      <div class='description'>
         <p>#${pokemon.id.toString().padStart(3, '0')}</p>
         <h3>${pokemon.name}</h3>
         <p class='type'>Type: <span>${pokemon.type}</span></p>
      </div>
   `;
   card.appendChild(el);
}

fetchPokemon();

// search pokemons 

input.addEventListener('keyup',(event)=>{
   const inputValue = event.target.value.toUpperCase();
   const elements = card.children;
   for(var i=0; i<elements.length; i++){
      let pokemonName = elements[i].getElementsByTagName('h3')[0].innerText;
      if(pokemonName.toUpperCase().includes(inputValue)){
         elements[i].style.display = ''
      }else{
         elements[i].style.display = 'none'
      }
   }
})

