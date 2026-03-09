let filters={
    brightness: {
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:  {
        value:100,
        min:0,
        max:200,
        unit:"%"

    },
    saturation:  {
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:  {
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:  {
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:  {
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:  {
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity: {
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert: {
        value:0,
        min:0,
        max:100,
        unit:"%"
    },

}

const imageCanvas=document.querySelector("#image-canvas")
const imgInput=document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#Download-btn")
const presetsContainer = document.querySelector(".presets")

let file= null
let image=null

const filtersContainer =document.querySelector(".filters")

function createFilterElement(name,value,unit="%",min,max){
    const div=document.createElement("div")
    div.classList.add("filter")

    const input=document.createElement("input")
    input.type="range"
    input.min=min
    input.max=max
    input.value=value
    input.id=name

    const p=document.createElement("p")
    p.innerText=name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input" , (event) => {
        /*filters[name]*/
        filters[ name ].value=input.value
        applyFilters()
    })

    return div

}
function createFilters() {

    Object.keys(filters).forEach(key => {

        const filterElement = createFilterElement(
            key,
            filters[key].value,
            filters[key].unit,
            filters[key].min,
            filters[key].max
        );

        filtersContainer.appendChild(filterElement);

    });

}

createFilters()

imgInput.addEventListener("change", (event) => {
     file = event.target.files[ 0 ]
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"

    const img = new Image()
    img.src=URL.createObjectURL(file)

    img.onload = () => {

        image=img
        imageCanvas.width= img.width
        imageCanvas.height= img.height
        canvasCtx.drawImage(img ,0, 0)

    }
});

function applyFilters() {

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)

    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    ` .trim()

    canvasCtx.drawImage(image, 0, 0)
}

resetButton.addEventListener("click", () => {
  filters = {
    brightness: {
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:  {
        value:100,
        min:0,
        max:200,
        unit:"%"

    },
    saturation:  {
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:  {
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:  {
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:  {
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:  {
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity: {
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert: {
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
  }
  applyFilters()

  filtersContainer.innerHTML = ""
  createFilters()

})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()

})

const presets = {
    normal: {
        brightness:100,
        contrast:100,
        saturation:100,
        hueRotation:0,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    vintage: {
        brightness:110,
        contrast:120,
        saturation:80,
        hueRotation:0,
        blur:0,
        grayscale:20,
        sepia:60,
        opacity:100,
        invert:0
    },

    cool: {
        brightness:100,
        contrast:110,
        saturation:150,
        hueRotation:180,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    blackWhite: {
        brightness:100,
        contrast:120,
        saturation:0,
        hueRotation:0,
        blur:0,
        grayscale:100,
        sepia:0,
        opacity:100,
        invert:0
    }
};

Object.keys(presets).forEach(presetName => {

    const presetsButton = document . createElement("button")
    presetsButton.classList.add("btn")
    presetsButton.innerText = presetName
    presetsContainer.appendChild(presetsButton)

    presetsButton.addEventListener('click', () => {
        const preset = presets [ presetName ]

        Object.keys(preset).forEach(filterName => {
            filters[ filterName ].value = preset [ filterName ]
        })

        applyFilters()
    })
})



