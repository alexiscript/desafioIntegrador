const socketClient = io();
const divProducts = document.getElementById('products-container');
const form = document.getElementById('formulario');
const category = document.getElementById('category');

let sender;

// Función para verificar si una cadena es un correo electrónico válido
function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

do {
    sender = prompt("Ingresa tu correo electrónico:");

    if (!isValidEmail(sender)) {
        alert("Por favor, ingresa un correo electrónico válido.");
    }
} while (!isValidEmail(sender));

const resetForm = () => {
    category.value = '';
}

socketClient.on('messages', messages => {
    console.log(messages)
    const messagesList = messages.map(msg => {
        return `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <!-- Aquí se muestra la foto del usuario -->
                        <img src="https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg" class="rounded-circle mr-2 img-fluid" alt="" style="max-width: 50px; max-height: 50px;">
                        <h5 class="card-title">${msg.user}</h5>
                    </div>
                    <p class="card-text mx-5">${msg.message}</p>
                </div>
            </div>
        `;
    }).join(' ');

    divProducts.innerHTML = messagesList;
});

form.onsubmit = (e) => {
    e.preventDefault();

    const product = {
        user: sender,
        message: category.value,
    }

    socketClient.emit('newMsg', product);
    resetForm();
}
