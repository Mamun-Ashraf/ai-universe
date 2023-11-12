const loadAiTools = async (dataLimit) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    displayAiTools(data?.data?.tools, dataLimit);
};

const displayAiTools = (tools, dataLimit) => {

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
        const { image, features, name, published_in } = tool || {};

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
// See more tools by clicking 'see more' button
document.getElementById('btn-see-more').addEventListener('click', function () {
    loadAiTools();
})
loadAiTools(6);