import estilos from './boton-app.css?inline'

export class BotonApp extends HTMLElement {
    
    // ENTRADAS
    static observedAttributes = [ 'variante', 'deshabilitado' ];

    private boton: HTMLButtonElement;

    // se ejecuta cuando se CREA el elemento
    constructor() {
        super();

        const sombra = this.attachShadow({mode: 'open'});

        sombra.innerHTML = ` 
            <style>${estilos}</style>
            <button><slot></slot></button>
        `;

        this.boton = sombra.querySelector('button')!;
    }

    // connectedCallback - cuando la etiqueta ENTRA en la página
    connectedCallback() {
        this.pintar();
    }

    attributeChangedCallback() {
        this.pintar();
    }

    // disconnectedCallback - cuando el elemento sale de la página
    // adoptedCallback - cuando la etiqueta se muda de una página a otra

    private pintar() {
        this.boton.className = this.getAttribute('variante') ?? 'primario';
        this.boton.disabled = this.hasAttribute('deshabilitado');
    }
}

// Como se va a llamar el elemento
customElements.define('boton-app', BotonApp);