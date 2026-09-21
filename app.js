
const input = document.getElementById('busqueda')
const mensaje = document.getElementById('mensaje')
const resultados = document.getElementById('resultados');

let timeId;

class ErrorDeRed extends Error {
  constructor(message){
    super(message);
    this.name = "ErrordeRed";
  }
}

class ErrorDeHTTP extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ErrordeHTTP";
    this.status = status;
  }
}

input.addEventListener('input', () => {

    reiniciar();
   clearTimeout(timeId);
   mensaje.textContent = 'Comprobando...'

   timeId = setTimeout(() => {
        const UserName = input.value
        fetchInfo(UserName)

   }, 700);});


async function fetchInfo(UserName)
{
    try
    {
        let result;
        let wasFound = false;

        let UserNames = await fetch('https://jsonplaceholder.typicode.com/users')
            if (!UserNames.ok) {
                throw new ErrorDeHTTP('ErrorHTTP', UserNames.status)
            }
            
        let usuarios = await UserNames.json()
        
        for(let i = 0; i < usuarios.length; i++)
        {
            if(usuarios[i].name.toUpperCase().includes(UserName.toUpperCase()))
            {   
                wasFound = true
                result = usuarios[i] 
                createCard(result);
            }
        }

            if(!wasFound)
                mensaje.textContent = 'Usuario No Encontrado!'
    }
    catch(error){
            if(error instanceof ErrorDeHTTP)
            {
                mensaje.textContent = `${error.name} Type = ${error.message} Status = ${error.status}` 
            }
            else
            {
                let errordeRed = new ErrorDeRed(error.message)
                mensaje.textContent =  `${errordeRed.name} Type = ${errordeRed.message}` 
            }
    }
}


function createCard(InfoUser) {

    mensaje.textContent = ''

    const tarjeta = document.createElement('li');
    tarjeta.classList.add('tarjeta');

    const tarjetaName = document.createElement('div');
    tarjetaName.classList.add('nombre'); 
    tarjetaName.textContent = InfoUser.name;

    const tarjetaEmail = document.createElement('div');
    tarjetaEmail.classList.add('email');
    tarjetaEmail.textContent = InfoUser.email;

    const tarjetaEmpresa = document.createElement('div');
    tarjetaEmpresa.classList.add('empresa');
    tarjetaEmpresa.textContent = InfoUser.company.name;

    tarjeta.appendChild(tarjetaName);
    tarjeta.appendChild(tarjetaEmail);
    tarjeta.appendChild(tarjetaEmpresa);

    resultados.appendChild(tarjeta);
}

function reiniciar(){
    resultados.innerHTML = ''
}
