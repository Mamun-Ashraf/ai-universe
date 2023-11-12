const loadAiTools = async () => {
    const res = await fetch(` https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    displayAiTools(data?.data?.tools);
};

const displayAiTools = (tools) => {
    tools?.forEach(tool => {
        const { image, features, name, published_in } = tool || {};

        const toolsContainer = document.getElementById('tools-container');
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('p-5', 'border', 'rounded');

        toolsDiv.innerHTML = `
            <div class='h-60'>
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
                <button>
                    <i class="fa-solid fa-arrow-right text-red-400 bg-ray-100 rounded-full p-3"></i>
                </button>
            </div>
        `
        toolsContainer.appendChild(toolsDiv);
    })
}

loadAiTools();