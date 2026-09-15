
const input = document.getElementById('busqueda')
const mensaje = document.getElementById('mensaje')
const resultados = document.getElementById('resultados');

let timeId;

input.addEventListener('input', () => {

    reiniciar()
   clearTimeout(timeId);
   mensaje.textContent = 'Comprobando...'

   timeId = setTimeout(() => {
        const UserName = input.value
        fetchInfo(UserName)

   }, 700);});


function fetchInfo(UserName)
{
    let result;
    let wasFound = false;

    fetch('https://jsonplaceholder.typicode.com/users')
    .then((UserNames) => 
    {
         if (!UserNames.ok) {
            throw new Error(`Error de servidor: ${UserNames.status}`);}
        
        return UserNames.json()
    })
    .then((UserNames) => 
    {
        for(let i = 0; i < UserNames.length; i++)
        {
            if(UserNames[i].name.toUpperCase().includes(UserName.toUpperCase()))
            {   
                wasFound = true
                result = UserNames[i] 
                createCard(result);
            }
        }

        if(!wasFound)
            mensaje.textContent = 'Usuario No Encontrado!'
    })
    .catch((error) => {
            mensaje.textContent = error.message;
            reiniciar();
    })
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

function reiniciar()
{
    resultados.innerHTML = '';
}

