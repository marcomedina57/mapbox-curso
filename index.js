

 let map;
 const obtenerUbicacion = async()=> {

  return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
              resolve([ coords.longitude, coords.latitude ])
          },
          ( err ) => {
              alert('No se pudo obtener la localizacion');
              reject();
          }
      )

  });

}

const buscar = async() => {

  const input = document.getElementById('busqueda').value;

  if (input.trim().length < 3) {
    return alert('Favor de ingresar un lugar para buscar');
  }
  const token = "pk.eyJ1IjoibWFyY29tZWRpbmE1NyIsImEiOiJja3BscmV3eHgzbDd0MnJsYTkya3VseG14In0.RvRgKorGJOdLkXhrRxi0Ag";
  

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?proximity=-73.990593%2C40.740121&types=place%2Cpostcode%2Caddress&language=es&access_token=${token}`;
  let resp = await fetch(url);
  resp = await resp.json();

  // console.log(resp.features[0].center);

  const ulList = document.getElementById('ulList');
  ulList.innerHTML = '';

  for (let lugar of resp.features){
    const liElement = document.createElement('li');
    liElement.classList.add("list-group-item" ,"list-group-item-action" , "pointer");
    liElement.addEventListener('click', () => {
        map.flyTo({
        zoom: 13,
        center: [ lugar.center[0], lugar.center[1]]
    })
    })
    liElement.innerHTML += `
      <h6>${lugar.text_es}</h6>
      <p >
        ${lugar.place_name}
      </p>
    `
    ulList.appendChild(liElement);
  }


  // const ubicacion = resp.features[0].center;


}

  
  const iniciar = () => {



    obtenerUbicacion().then((latlon) => {
      
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY29tZWRpbmE1NyIsImEiOiJja3BscmV3eHgzbDd0MnJsYTkya3VseG14In0.RvRgKorGJOdLkXhrRxi0Ag';
         map = new mapboxgl.Map({
          container: 'map', // container ID
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [latlon[0], latlon[1]], // starting position [lng, lat]
          zoom: 14, // starting zoom
          projection: 'globe' // display the map as a 3D globe
      });

      map.on('style.load', () => {
          map.setFog({}); // Set the default atmosphere style
          document.getElementById('btnCargar').setAttribute("hidden", "hidden");
          document.getElementById('btnBuscar').removeAttribute("hidden");
      });

      })

    
  }
  
  


 
  

