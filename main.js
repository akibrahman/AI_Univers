const cardsContainer = document.getElementById("cardsContainer");
const showMore = document.getElementById("showMore");
const sortButton = document.getElementById("sortButton");
const loader = document.getElementById("loader");
const loaderModal = document.getElementById("loaderModal");
const modalWrap = document.getElementById("modalWrap");
const modal = document.getElementById("modal");

const loadData = async () => {
  loader.classList.remove("hidden");
  try {
    let url = "https://openapi.programming-hero.com/api/ai/tools";
    const responce = await fetch(url);
    const data = await responce.json();
    processData(data.data.tools);
  } catch (err) {
    console.log(err);
  }
};
loadData();

const processData = (data) => {
  let mainArray = data.slice(0, 6);
  showMore.addEventListener("click", () => {
    showMore.classList.add("hidden");
    loader.classList.remove("hidden");
    mainArray = [...data];
    displayData(mainArray);
  });
  displayData(mainArray);
  sortButton.addEventListener("click", () => {
    sortData(mainArray);
  });
};

const sortData = (data) => {
  let arrayOfDates = [];
  let newArrayOfData = [];
  let array = [...data];
  array.forEach((element) => {
    let date = element.published_in;
    arrayOfDates.push(date);
  });
  arrayOfDates.sort(compareDates);
  arrayOfDates.forEach((elementDate) => {
    let targetedObj = array.find(
      (element) => element.published_in == elementDate
    );
    newArrayOfData.push(targetedObj);
    array.splice(array.indexOf(targetedObj), 1);
  });
  displayData(newArrayOfData);
};

const compareDates = (dateStr1, dateStr2) => {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  return date1 - date2;
};
const replaceImage = (element) => {
  element.src = "./images/a.jpg";
};

const displayData = (arr) => {
  loader.classList.add("hidden");
  cardsContainer.innerHTML = ``;
  arr.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("text-[#828282]", "border", "rounded-lg", "p-5", "pb-0");
    div.innerHTML = `
              <img onerror="replaceImage(this)" class="rounded-lg w-full h-[210px]" src="${element.image}" alt="" />
                  <h1 class="text-[#111] text-2xl font-semibold my-5">Features</h1>
                  <div class="border-b pb-5">
                    <p class="">1. ${element.features[0]}</p>
                    <p class="">2. ${element.features[1]}</p>
                    <p class="">3. ${element.features[2]}</p>
                  </div>
                  <div class="flex justify-between items-center py-5">
                    <div class="">
                      <h1 class="text-[#111] text-2xl font-semibold mb-1">${element.name}</h1>
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-calendar-days"></i>
                        <span class="text-xs">${element.published_in}</span>
                      </div>
                    </div>
                    <i onclick="loadDetails('${element.id}')" class="fa-solid fa-arrow-right-long text-[#EA5757] cursor-pointer"></i>
                  </div>
              `;
    cardsContainer.appendChild(div);
  });
};

const loadDetails = async (id) => {
  modalWrap.classList.remove("hidden");
  loaderModal.classList.remove("hidden");
  try {
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    details(data.data);
  } catch (err) {
    console.log(err);
  }
};

const details = (data) => {
  modal.innerHTML = "";
  modal.innerHTML = `
  <i onclick="closeModal()"
  class="fa-solid fa-xmark absolute -top-3 -right-3 bg-red-500 text-white h-10 w-10 flex items-center justify-center rounded-full cursor-pointer"
></i>
<div class="w-[90%] mx-auto flex gap-6 max-h-[90%]">
  <div class="border rounded-3xl border-red-400 bg-red-100 p-6 overflow-y-hidden max-w-[55%]">
    <p class="text-[#111] text-xl font-semibold mb-5 w-5/6">${data.description}
    </p>
    <div class="flex items-center justify-evenly mb-5">
      <div
        class="flex items-center justify-center text-base text-center font-bold text-green-500 rounded-xl bg-white w-[100px] h-[100px] py-2"
      >
        ${data.pricing ? data.pricing[0].price : "Nai"}<br />${
    data.pricing ? data.pricing[0]?.plane : "Nai"
  }
      </div>
      <div
        class="flex items-center justify-center text-base text-center font-bold text-orange-500 rounded-xl bg-white w-[100px] h-[100px] py-2"
      >
      ${data.pricing ? data.pricing[1].price : "Nai"}<br />${
    data.pricing ? data.pricing[1]?.plane : "Nai"
  }
      </div>
      <div
        class="flex items-center justify-center text-base text-center font-bold text-red-500 rounded-xl bg-white w-[100px] h-[100px] py-2"
      >
      ${data.pricing ? data.pricing[2].price : "Nai"}<br />${
    data.pricing ? data.pricing[2]?.plane : "Nai"
  }
      </div>
    </div>
    <div class="flex gap-8 mb-7">
      <div class="">
        <h1 class="text-[#111] text-xl font-semibold mb-2">Features</h1>
        <ul class="ml-2">
          <li class="text-sm text-[#585858]">${
            data.features["1"].feature_name
          }</li>
          <p class="text-sm text-[#585858]">${
            data.features["2"].feature_name
          }</p>
          <p class="text-sm text-[#585858]">${
            data.features["3"].feature_name
          }</p>
        </ul>
      </div>
      <div class="">
        <h1 class="text-[#111] text-xl font-semibold mb-2">
          Integrations
        </h1>
        <ul class="ml-2">
          <p class="text-sm text-[#585858]">${
            data.integrations ? data.integrations[0] : "Nai"
          }</p>
          <p class="text-sm text-[#585858]">${
            data.integrations ? data.integrations[1] : "Nai"
          }</p>
          <p class="text-sm text-[#585858]">${
            data.integrations ? data.integrations[2] : "Nai"
          }</p>
        </ul>
      </div>
    </div>
  </div>
  <div class="border rounded-3xl">
    <div class="flex flex-col items-center gap-2 mt-4 h-full ">
      <img onerror="replaceImage(this)"
        src="${data.image_link}"
        class=" w-[90%] h-[60%]  rounded-3xl"
        alt=""
      />
      <p class="text-[#111] text-xl font-semibold mt-5">
        Hi, how are you doing today?
      </p>
      <p class="text-[#585858] text-base text-center w-[80%]">
        I'm doing well, thank you for asking. How can I assist you
        today?
      </p>
    </div>
  </div>
</div>

  `;
};

const closeModal = () => {
  modalWrap.classList.add("hidden");
};
