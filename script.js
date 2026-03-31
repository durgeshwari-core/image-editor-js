let filters = {
    brightness: {
        min: 0,
        max: 200,
        value: 100,
        Unit: "%"
    },
    contrast: {
        min: 0,
        max: 200,
        value: 100,
        Unit: "%"
    },
    saturate: {
        min: 0,
        max: 200,
        value: 100,
        Unit: "%"
    },

    hueRotation: {
        min: 0,
        max: 360,
        value: 0,
        Unit: "deg"
    },
    blur: {
        min: 0,
        max: 20,
        value: 0,
        Unit: "px"
    },
    grayscale: {
        min: 0,
        max: 100,
        value: 0,
        Unit: "%"
    },
    sepia: {
        min: 0,
        max: 100,
        value: 0,
        Unit: "%"
    },
    opacity: {
        min: 0,
        max: 100,
        value: 100,
        Unit: "%"
    },
    invert: {
        min: 0,
        max: 100,
        value: 0,
        Unit: "%"
    }
}

const imageCanvas = document.getElementById("image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetbtn = document.querySelector("#reset-btn");
const downloadbtn = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let file = null;
let image = null;

const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, Unit = "%", min, value, max) {
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {
        filters[name].value = input.value;
        applyfilters();
    })

    return div;
}


function createFilters() {
    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key, filters[key].Unit, filters[key].min, filters[key].value, filters[key].max);
        filtersContainer.appendChild(filterElement);
    })
}
createFilters();
imgInput.addEventListener("change", (event) => {

    file = event.target.files[0];
    const imagePlaceholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0);
    }


})

function applyfilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter =
        `brightness(${filters.brightness.value}${filters.brightness.Unit}) 
         contrast(${filters.contrast.value}${filters.contrast.Unit})
        saturate(${filters.saturate.value}${filters.saturate.Unit}) 
     hue-rotate(${filters.hueRotation.value}${filters.hueRotation.Unit}) 
     blur(${filters.blur.value}${filters.blur.Unit}) 
     grayscale(${filters.grayscale.value}${filters.grayscale.Unit}) 
     sepia(${filters.sepia.value}${filters.sepia.Unit}) 
     opacity(${filters.opacity.value}${filters.opacity.Unit}) 
     invert(${filters.invert.value}${filters.invert.Unit})`.trim();

    canvasCtx.drawImage(image, 0, 0);
}
resetbtn.addEventListener("click", () => {
    filters = {
        brightness: {
            min: 0,
            max: 200,
            value: 100,
            Unit: "%"
        },
        contrast: {
            min: 0,
            max: 200,
            value: 100,
            Unit: "%"
        },
        saturate: {
            min: 0,
            max: 200,
            value: 100,
            Unit: "%"
        },

        hueRotation: {
            min: 0,
            max: 360,
            value: 0,
            Unit: "deg"
        },
        blur: {
            min: 0,
            max: 20,
            value: 0,
            Unit: "px"
        },
        grayscale: {
            min: 0,
            max: 100,
            value: 0,
            Unit: "%"
        },
        sepia: {
            min: 0,
            max: 100,
            value: 0,
            Unit: "%"
        },
        opacity: {
            min: 0,
            max: 100,
            value: 100,
            Unit: "%"
        },
        invert: {
            min: 0,
            max: 100,
            value: 0,
            Unit: "%"
        }
    }
    applyfilters();
    filtersContainer.innerHTML = ""
    createFilters();
});
downloadbtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
})

const PRESETS = {
    normal: { brightness: 100, contrast: 100, saturate: 100, sepia: 0, grayscale: 0, hueRotation: 0, blur: 0 },

    vintage: { brightness: 110, contrast: 90, saturate: 80, sepia: 40, grayscale: 10, hueRotation: 10, blur: 0 },

    dramatic: { brightness: 90, contrast: 140, saturate: 120, sepia: 0, grayscale: 0, hueRotation: 0, blur: 0 },

    cool: { brightness: 100, contrast: 110, saturate: 110, sepia: 0, grayscale: 0, hueRotation: 180, blur: 0 },

    warm: { brightness: 105, contrast: 105, saturate: 120, sepia: 20, grayscale: 0, hueRotation: -20, blur: 0 },

    blackwhite: { brightness: 100, contrast: 120, saturate: 0, sepia: 0, grayscale: 100, hueRotation: 0, blur: 0 }
};
Object.keys(PRESETS).forEach(presetName => {
    const presetBtn = document.createElement("button");
    presetBtn.classList.add("btn");
    presetBtn.innerText = presetName;
    presetsContainer.appendChild(presetBtn);

    presetBtn.addEventListener("click", () => {
        const preset = PRESETS[presetName];
        // console.log(preset);
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
            const input = document.getElementById(filterName);
            if (input) input.value = preset[filterName];
        })
        applyfilters();
    })

})
