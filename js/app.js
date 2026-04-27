fetch("data/recetas.xml")
    .then(response => response.text())
    .then(xmlText => {
        const recetas = parsearXML(xmlText);
        mostrarRecetas(recetas);
    })


function parsearXML(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
        throw new Error("El XML no es válido: " + parseError.textContent);
    }
    const nodos = xmlDoc.querySelectorAll("receta");
    const recetas = [];

    nodos.forEach(nodo => {
        recetas.push({
            codigo:     nodo.getAttribute("codigo"),
            nombre:     nodo.querySelector("nombre").textContent,
            categoria:  nodo.querySelector("categoria").textContent,
            tiempo:     parseInt(nodo.querySelector("tiempo").textContent, 10),
            dificultad: nodo.querySelector("dificultad").textContent
        });
    });

    return recetas;
}

function mostrarRecetas(recetas) {
    const tbody = document.getElementById("tablaRecetas");
    tbody.innerHTML = "";

    recetas.forEach(receta => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${receta.codigo}</td>
      <td>${receta.nombre}</td>
      <td>${receta.categoria}</td>
      <td>${receta.tiempo} min</td>
      <td>${receta.dificultad}</td>
    `;
        tbody.appendChild(fila);
    });
}