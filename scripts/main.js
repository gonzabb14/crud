const API_URL = "https://6540ff8245bedb25bfc308b8.mockapi.io/users/";
const list = document.getElementById("results");

function listProducts(arr) {
    arr.forEach(user => {
        let li = document.createElement("li");
        li.innerHTML =
            `
            <p>ID: ${user.id}</p>
            <p>NAME: ${user.name}</p>
            <p>LASTNAME: ${user.lastname}</p>
            `
        list.appendChild(li);
    });
}

document.getElementById("btnGet1").addEventListener("click", function (event) {
    const ID = document.getElementById("inputGet1Id").value;
    list.innerHTML = "";

    if (ID !== "") {
        fetch(API_URL + ID)
            .then(response => {
                //console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("No hay usuarios con ese ID");
                }
            })
            .then(data => {
                console.log(data);
                let li = document.createElement("li");
                li.innerHTML =
                    `
                <p>ID: ${data.id}</p>
                <p>NAME: ${data.name}</p>
                <p>LASTNAME: ${data.lastname}</p>
            `
                list.appendChild(li);
            })
            .catch(error => console.log(error.message));
    } else {
        fetch(API_URL)
            .then(response => {
                //console.log(response);
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                listProducts(data);
            })
            .catch(error => console.log(error.message));
    }
});

document.getElementById("btnPost").addEventListener("click", function (event) {
    const name = document.getElementById("inputPostNombre").value;
    const lastname = document.getElementById("inputPostApellido").value;

    let data = {
        "name": name,
        "lastname": lastname
    };

    let miInicializador = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    if (name !== "" && lastname !== "") {
        fetch(API_URL, miInicializador)
            .then(response => {
                fetch(API_URL)
                    .then(response => response.json())
                    .then(data => {
                        listProducts(data);
                    })
                    .catch(error => console.log(error.message));
            })
            .catch(error => console.log(error.message));

    }
});

document.getElementById("btnSendChanges").addEventListener("click", function (event) {
    const ID = document.getElementById("inputPutId").value;
    const name = document.getElementById("inputPutNombre").value;
    const lastname = document.getElementById("inputPutApellido").value;

    let data = {
        "name": name,
        "lastname": lastname
    };

    let miInicializador = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    if (name !== "" && lastname !== "") {
        fetch(API_URL + ID, miInicializador)
            .then(response => {
                fetch(API_URL)
                    .then(response => response.json())
                    .then(data => {
                        listProducts(data);
                        //document.getElementById("dataModal").classList.toggle("modal");
                    })
                    .catch(error => console.log(error.message));
            })
            .catch(error => console.log(error.message));
    }


});

document.getElementById("btnDelete").addEventListener("click", function (event) {
    const userID = document.getElementById("inputDelete").value;
    if (!userID) {
        console.error("Debe ingresar un id existente");
        return;
    }

    const requestOptions = {
        method: 'DELETE',
    };

    fetch(API_URL + userID, requestOptions)
        .then(response => {
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    listProducts(data);
                    //document.getElementById("dataModal").classList.toggle("modal");
                })
                .catch(error => console.log(error.message));
        })


})
