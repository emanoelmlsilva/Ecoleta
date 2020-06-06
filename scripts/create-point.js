function getValues(url, select) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (const dataValue of data) {
        select.innerHTML += `<option value="${dataValue.id}">${dataValue.nome}</option>`;
      }

      if (select.disabled) {
        select.disabled = false;
      }
    });
}

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  getValues(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
    ufSelect
  );
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/microrregioes`;

  getValues(url, citySelect);
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
