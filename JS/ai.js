const loadAiTools = async (dataLimit) => {
    toggleLoader(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    displayAiTools(data?.data?.tools, dataLimit);
};

const displayAiTools = (tools, dataLimit) => {
    // console.log(tools);
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.textContent = '';
    const seeMore = document.getElementById('see-more');
    const noTools = document.getElementById('no-found-message');

    // display no tools found message
    if (tools.length === 0) {
        noTools.classList.remove('hidden');
    }

    // display 6 tools only
    else if (dataLimit && tools.length > dataLimit) {
        tools = tools.slice(0, dataLimit);
        seeMore.classList.remove('hidden');
        noTools.classList.add('hidden');
    }

    else {
        seeMore.classList.add('hidden');
        noTools.classList.add('hidden');
    }

    // display all tools
    tools.forEach(tool => {
        const { id, image, features, name, published_in } = tool || {};

        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('p-5', 'border', 'rounded');

        toolsDiv.innerHTML = `
            <div class='h-60 shadow-lg'>
                <img src=${image} alt="">
            </div>
            <h4 class="my-3 text-lg font-bold">Features</h4>
            <ul class='list-decimal ms-5'>
            ${features?.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <hr class="my-3" />
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="text-lg font-bold">${name}</h4>
                    <div class='flex items-center mt-3'>
                        <i class="fa-solid fa-calendar-days me-3"></i>
                        <p>${published_in}</p>
                    </div>
                </div>
                <button onclick="loadToolsDetails('${id}')">
                    <i class="fa-solid fa-arrow-right text-red-400 bg-gray-100 rounded-full p-3"></i>
                </button>
            </div>
        `
        toolsContainer.appendChild(toolsDiv);
        toggleLoader(false);
    })
}

// toggle loader
const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}
// See more tools by clicking 'see more' button
document.getElementById('btn-see-more').addEventListener('click', function () {
    loadAiTools();
});

// open modal and display tools details

const modal = document.getElementById('toolDetailModal');

const loadToolsDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    console.log(data.data);
    displayToolsDetails(data.data);
}

const displayToolsDetails = (toolDetail) => {
    const { description, pricing, features, integrations, image_link
        , input_output_examples, accuracy } = toolDetail || {};
    console.log(pricing);
    const modalContainer = document.getElementById('modal-container');
    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList.add('md:flex', 'gap-5', 'p-1', 'md:p-6');
    modalContentDiv.innerHTML = `
        <div class="border border-red-400 rounded p-5 md:w-1/2">
            <div>
                <h3 class="text-lg font-bold">${description}</h3>
            </div>
            <div class="flex gap-3 my-3">
                <h3 class="bg-red-50 text-green-400 rounded p-3 text-center"><span>${pricing[0] ? pricing[0].price : 'Free Of Cost'}</span>/ <br> <span>${pricing[0].plan}</span></h3>

                <h3 class="bg-red-50 text-orange-400 rounded p-3 text-center"><span>${pricing[1] ? pricing[1].price : 'Free Of Cost'}</span>/ <br> <span>${pricing[1].plan}</span></h3>

                <h3 class="bg-red-50 text-red-400 rounded p-3 text-center"><span>${pricing[2] ? pricing[2].price : 'Free Of Cost'}</span>/ <br> <span></span>${pricing[2].plan}</h3>
            </div>
            <div class="flex justify-between gap-3">
                <div>
                    <h2 class="text-xl font-semibold mb-3">Features</h2>
                    <ul class='list-disc ms-5'>
                        ${Object.values(features).map(feature => `<li>${feature.feature_name}</li>`).join('')}
                        
                    </ul>
                </div>
                <div>
                <h2 class="text-xl font-semibold mb-3">Integrations</h2>
                    ${integrations ?
            `<ul class='list-disc ms-5'>
                                ${integrations.map(integration => `<li>${integration}</li>`).join('')}
                            </ul>`
            :
            'No data found'
        }
            </div>
            </div>
        </div>
        <div class="border rounded md:w-1/2 p-5">
            <div class='h-40 shadow-lg'>
                <img src=${image_link[0]} alt="">
            </div>
            <div class=''>
                <h4 class="bg-red-400 text-white px-3 py-1 w-32 relative bottom-40 left-40 ${accuracy?.score ? 'block' : 'hidden'}">${accuracy.score * 100} % Accuracy</h4>
            </div>
            ${input_output_examples.map(example => {
            return `<h3 class="text-lg font-bold my-3">
                        ${example.input}
                    </h3>
                    <p>
                        ${example.output}
                    </p>`;
        }).join('')}
        </div>
    `
    modalContainer.appendChild(modalContentDiv);
    modal.classList.remove('hidden');
}

// close modal

document.getElementById('closeModalButton').addEventListener('click', function () {
    modal.classList.add('hidden');
});


loadAiTools(6);
// loadToolsDetails();