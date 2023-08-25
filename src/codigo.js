const { invoke } = window.__TAURI__.tauri;

const contenedor = document.getElementById("entradas")
let elementMsg = document.getElementById("msg")


const btnConsulta = document.getElementById("btnConsulta")
btnConsulta.addEventListener('click', () => {
    
    /*const main = async () => {
        try {
            const currentPath = await window.__TAURI__.tauri.invoke("get_current_path");
            alert(`La ruta actual es: ${currentPath}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    main();*/

    elementMsg.innerHTML = "CONSULTA DE SALDOS"

    contenedor.innerHTML = `
    <div class="form-group">
        <label for="ftarjeta">ID de Tarjeta:</label>
        <input type="text" id="ftarjeta" name="ftarjeta">
    </div>

    <div class="form-group">
        <label for="fclave">Clave Personal:</label>
        <input type="password" id="fclave" name="fclave">
    </div>

    <textarea readonly id="textarea" name="textarea" rows="3" cols="45"></textarea>
    `
    document.getElementById("ftarjeta").focus();

    // Add event listener for Enter key press
    document.getElementById("ftarjeta").addEventListener("keypress",  function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            // si lo encuentra pasar el foco
            document.getElementById("fclave").focus();
        }
    })

    document.getElementById("fclave").addEventListener("keypress",  async function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            
            // buscar en dataset

            const idValue = parseInt(document.getElementById("ftarjeta").value)
            const claveValue = parseInt(event.target.value)

            //console.log("Buscando con Tauri")
            //console.log("id = " + idValue)
            //console.log("clave = " + claveValue)

            /*const tauri = window.__TAURI__;
            
            tauri.promisified({
                cmd: "readTextFile",
                path: "MOCK_DATA.json"
            }).then(response => {
                const jsonData = JSON.parse(response);
                const targetId = 9;
                const targetObject = jsonData.find(item => item.id === targetId);
    
                if (targetObject) {
                    const resultDiv = document.getElementById("result");
                    resultDiv.textContent = JSON.stringify(targetObject, null, 2);
                } else {
                    console.log("Objeto con el ID", targetId, "no encontrado.");
                }
            }).catch(error => {
                console.error("Error al leer el archivo:", error);
            });*/

            

            // Invoke the command
            //invoke('my_custom_command')
            //invoke('my_custom_command', { invokeMessage: 'Hello!' })
            //invoke('my_custom_command').then((message) => console.log(message))

            /*invoke('my_custom_command', {
                codigo: enteredValue
            }).then((message) => console.log(message))*/

            /*try {
                const response = await window.__TAURI__.tauri.invoke('read_json_file');
                console.log('Read JSON:', response);
            } catch (error) {
                console.error('Error reading JSON:', error);
            }*/

            
            /*const main = async () => {
                try {
                    //const result = await invoke("search_by_id", 3);
                    //const result = await window.__TAURI__.tauri.invoke("search_by_id", 3);
                    const result = await window.__TAURI__.tauri.invoke("search_by_id", { id: idValue });
                    
                    if (result) {
                        console.log('Objeto encontrado:', result);
                    } else {
                        console.log('Objeto no encontrado');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            main()*/

            const main = async () => {
                try {
                    const result = await window.__TAURI__.tauri.invoke("search_by_id_consulta", { params: { id: idValue, clave: claveValue } });
                    if (result) {
                        /*console.log('Objeto encontrado:', result);
                        console.log("Nombre: " + result.Nombre)
                        console.log("Apellido: " + result.Apellido)
                        console.log("Saldo: " + result.Saldo)*/
                        //Javier Gracia M.\nSaldo: $55.68
                        //elResult.innerHTML = "xxx"
                        document.getElementById("textarea").value = "Bienvenido " + result.Nombre + ' ' + result.Apellido + '\nSu saldo es: $ ' + parseFloat(result.Saldo).toFixed(2)

                    } else {
                        //console.log('Objeto no encontrado');
                        document.getElementById("textarea").value = "Tarjeta o clae inválida!!"

                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };
    
            main();

            // si lo encuentra pasar el foco
            //document.getElementById("fclave").focus();
        }
    })
})


const btnDeposito = document.getElementById("btnDeposito")
btnDeposito.addEventListener('click', () => {
    elementMsg.innerHTML = "DEPÓSITO DE DINERO"
    contenedor.innerHTML = `
    <div class="form-group">
        <label for="ftarjeta">ID de Tarjeta:</label>
        <input type="text" id="ftarjeta" name="ftarjeta">
    </div>

    <div class="form-group">
        <label for="fclave">Clave Personal:</label>
        <input type="password" id="fclave" name="fclave">
    </div>

    <div class="form-group">
        <label for="fmonto">Monto:</label>
        <input type="text" id="fmonto" name="fmonto" >
    </div>

    <textarea readonly id="textarea" name="textarea" rows="3" cols="45"></textarea>
    `
    document.getElementById("ftarjeta").focus();

    // Add event listener for Enter key press
    document.getElementById("ftarjeta").addEventListener("keypress",  function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            // si lo encuentra pasar el foco
            document.getElementById("fclave").focus();
        }
    })

    document.getElementById("fclave").addEventListener("keypress",  function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            const idValue = parseInt(document.getElementById("ftarjeta").value)
            const claveValue = parseInt(event.target.value)

            const main = async () => {
                try {
                    const result = await window.__TAURI__.tauri.invoke("search_by_id_consulta", { params: { id: idValue, clave: claveValue } });
                    if (result) {
                        /*console.log('Objeto encontrado:', result);
                        console.log("Nombre: " + result.Nombre)
                        console.log("Apellido: " + result.Apellido)
                        console.log("Saldo: " + result.Saldo)*/
                        //Javier Gracia M.\nSaldo: $55.68
                        //elResult.innerHTML = "xxx"
                        document.getElementById("textarea").value = "Bienvenido " + result.Nombre + ' ' + result.Apellido + '\nSu saldo es: $ ' + parseFloat(result.Saldo).toFixed(2)

                        // si lo encuentra pasar el foco
                        document.getElementById("fmonto").focus();


                    } else {
                        //console.log('Objeto no encontrado');
                        document.getElementById("textarea").value = "Tarjeta o clae inválida!!"
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };
    
            main();

        }
    })

    document.getElementById("fmonto").addEventListener("keypress",  async function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            const idValue = parseInt(document.getElementById("ftarjeta").value)
            const claveValue = parseInt(document.getElementById("fclave").value)
            const montoValue = parseFloat(event.target.value)

            const main = async () => {
                try {
                    //const result = await window.__TAURI__.tauri.invoke("search_by_id_consulta", { params: { id: idValue, clave: claveValue } });
                    const result = await window.__TAURI__.tauri.invoke("search_by_id_deposito", { params: { id: idValue, clave: claveValue, monto: montoValue } });
                    if (result) {
                        /*console.log('Objeto encontrado:', result);
                        console.log("Nombre: " + result.Nombre)
                        console.log("Apellido: " + result.Apellido)
                        console.log("Saldo: " + result.Saldo)*/
                        //Javier Gracia M.\nSaldo: $55.68
                        //elResult.innerHTML = "xxx"
                        document.getElementById("textarea").value = "Bienvenido " + result.Nombre + ' ' + result.Apellido + '\nSu saldo es: $ ' + parseFloat(result.Saldo).toFixed(2)

                    } else {
                        //console.log('Objeto no encontrado');
                        document.getElementById("textarea").value = "Tarjeta o clae inválida!!"

                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };
    
            main();
        }

    })


})

const btnRetiro = document.getElementById("btnRetiro")
btnRetiro.addEventListener('click', () => {
    elementMsg.innerHTML = "RETIRO DE DINERO"
    contenedor.innerHTML = `
    <div class="form-group">
        <label for="ftarjeta">ID de Tarjeta:</label>
        <input type="text" id="ftarjeta" name="ftarjeta">
    </div>

    <div class="form-group">
        <label for="fclave">Clave Personal:</label>
        <input type="password" id="fclave" name="fclave">
    </div>

    <div class="form-group">
        <label for="fmonto">Monto:</label>
        <input type="text" id="fmonto" name="fmonto" >
    </div>

    <textarea readonly id="textarea" name="textarea" rows="3" cols="45"></textarea>
    `
    document.getElementById("ftarjeta").focus();

    // Add event listener for Enter key press
    document.getElementById("ftarjeta").addEventListener("keypress",  function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            // si lo encuentra pasar el foco
            document.getElementById("fclave").focus();
        }
    })

    document.getElementById("fclave").addEventListener("keypress",  function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            const idValue = parseInt(document.getElementById("ftarjeta").value)
            const claveValue = parseInt(event.target.value)

            const main = async () => {
                try {
                    const result = await window.__TAURI__.tauri.invoke("search_by_id_consulta", { params: { id: idValue, clave: claveValue } });
                    if (result) {
                        /*console.log('Objeto encontrado:', result);
                        console.log("Nombre: " + result.Nombre)
                        console.log("Apellido: " + result.Apellido)
                        console.log("Saldo: " + result.Saldo)*/
                        //Javier Gracia M.\nSaldo: $55.68
                        //elResult.innerHTML = "xxx"
                        document.getElementById("textarea").value = "Bienvenido " + result.Nombre + ' ' + result.Apellido + '\nSu saldo es: $ ' + parseFloat(result.Saldo).toFixed(2)

                        // si lo encuentra pasar el foco
                        document.getElementById("fmonto").focus();


                    } else {
                        //console.log('Objeto no encontrado');
                        document.getElementById("textarea").value = "Tarjeta o clae inválida!!"
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };
    
            main();

        }
    })

    document.getElementById("fmonto").addEventListener("keypress",  async function(event) {
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();

            const idValue = parseInt(document.getElementById("ftarjeta").value)
            const claveValue = parseInt(document.getElementById("fclave").value)
            const montoValue = parseFloat(event.target.value)

            const main = async () => {
                try {
                    //const result = await window.__TAURI__.tauri.invoke("search_by_id_consulta", { params: { id: idValue, clave: claveValue } });
                    const result = await window.__TAURI__.tauri.invoke("search_by_id_retiro", { params: { id: idValue, clave: claveValue, monto: montoValue } });
                    if (result) {
                        /*console.log('Objeto encontrado:', result);
                        console.log("Nombre: " + result.Nombre)
                        console.log("Apellido: " + result.Apellido)
                        console.log("Saldo: " + result.Saldo)*/
                        //Javier Gracia M.\nSaldo: $55.68
                        //elResult.innerHTML = "xxx"
                        document.getElementById("textarea").value = "Bienvenido " + result.Nombre + ' ' + result.Apellido + '\nSu saldo es: $ ' + parseFloat(result.Saldo).toFixed(2)

                    } else {
                        //console.log('Objeto no encontrado');
                        document.getElementById("textarea").value = "Tarjeta o clae inválida!!"

                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            };
    
            main();
        }

    })

})

const btnCancelar = document.getElementById("btnCancelar")
btnCancelar.addEventListener('click', () => {
    elementMsg.innerHTML = ""
    contenedor.innerHTML = `
        <img src="/assets/pngegg.png" width="350" height="230" />
    `
})

