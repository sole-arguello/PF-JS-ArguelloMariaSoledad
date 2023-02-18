const contPreguntas = document.getElementById("preguntas")

const content = document.createElement("div")
content.classList.add("preguntas__contenedor", "accordion", "accordion-flush", "container")
content.innerHTML = `
<div class="preguntas__contenedor accordion accordion-flush container" id="accordionFlushExample">
<div class="preguntas__contenedor--cont accordion-item bg-transparent">
  <h2 class="preguntas__subtitulo accordion-header" id="flush-headingOne">
    <button
      class="preguntas__btn accordion-button collapsed text-dark fs-5 "
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#flush-collapseOne"
      aria-expanded="false"
      aria-controls="flush-collapseOne"
    >
      ¿Que formas de pago reciben?
    </button>
  </h2>
  <div
    id="flush-collapseOne"
    class="preguntas__respuesta accordion-collapse collapse"
    aria-labelledby="flush-headingOne"
    data-bs-parent="#accordionFlushExample"
  >
    <p class="preguntas__respuesta--texto mx-5 pt-2">
      ¡Si! Recibimos tarjetas de Debito, Credito o Transferencia
      bancaria.
    </p>
  </div>
</div>
<div class="preguntas__contenedor--cont accordion-item bg-transparent">
  <h2 class="preguntas__subtitulo accordion-header" id="flush-headingTwo">
    <button
      class="preguntas__btn accordion-button collapsed text-dark fs-5"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#flush-collapseTwo"
      aria-expanded="false"
      aria-controls="flush-collapseTwo"
    >
      ¿Tiene envio a domicilio?
    </button>
  </h2>
  <div
    id="flush-collapseTwo"
    class="preguntas__respuesta accordion-collapse collapse"
    aria-labelledby="flush-headingTwo"
    data-bs-parent="#accordionFlushExample"
  >
    <p class="preguntas__respuesta--texto mx-5 pt-2">
      Por el momento no contamos con envio, se retira por el local
    </p>
  </div>
</div>
<div class="preguntas__contenedor--cont accordion-item bg-transparent">
  <h2 class="preguntas__subtitulo accordion-header" id="flush-headingThree">
    <button
      class="preguntas__btn accordion-button collapsed text-dark fs-5"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#flush-collapseThree"
      aria-expanded="false"
      aria-controls="flush-collapseThree"
    >
      ¿Si tengo dudas por donde consulto?
    </button>
  </h2>
  <div
    id="flush-collapseThree"
    class="preguntas__respuesta accordion-collapse collapse"
    aria-labelledby="flush-headingThree"
    data-bs-parent="#accordionFlushExample"
  >
    <p class="preguntas__respuesta--texto mx-5 pt-2">
      Podes contactarnos en el watsap que figura en la pagina, te contestaremos a la brevedad.
    </p>
  </div>
</div>
</div>
`
contPreguntas.appendChild(content)