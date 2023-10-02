import axios from 'axios';

interface Character {
    id: string,
    nombre: string,
    apodo: string,
    especialidad: string,
    habilidades: string[],
    amigo: string,
    imagen: string
};

const getData = async (): Promise<Character[]> => {
    try {
        const { data } = await axios.get('http://localhost:3000/personajes');
        return data;
    } catch (error) {
        console.error('Error al obtener los personajes', error);
        return [];
    }
}

const createTextElement = (label: string, content: string): HTMLElement => {
    const element = document.createElement('div');
    element.classList.add('div-name');
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('span');
    labelSpan.textContent = label;
    const contentSpan = document.createElement('span');
    contentSpan.textContent = content;
    element.appendChild(labelSpan);
    element.appendChild(contentSpan);
    return element;
}

const buildCard = (character: Character): HTMLElement => {
    const cardCharacter = document.createElement('div');
    cardCharacter.classList.add('div-card');

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = `http://localhost:3000//${character.imagen}`;
    cardCharacter.appendChild(image);

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    textContainer.appendChild(createTextElement('Nombre: ', character.nombre));
    textContainer.appendChild(createTextElement('Especialidad: ', character.especialidad));
    textContainer.appendChild(createTextElement('Habilidades: ', character.habilidades.join(', ')));

    cardCharacter.appendChild(textContainer);

    return cardCharacter;
}

const containerCard = (characters: Character[]) => {
    const cardsDiv = document.getElementById('cards');

    for (const character of characters) {
        const card = buildCard(character)

        if (cardsDiv) {
            cardsDiv.appendChild(card);
        }
    }
}

const data = await getData()
containerCard(data)

const removeAccents = (str: string): string => {
    const accentMap: { [key: string]: string } = {
        á: 'a',
        é: 'e',
        í: 'i',
        ó: 'o',
        ú: 'u',
        ü: 'u',
    };

    return str.replace(/[áéíóúüÁÉÍÓÚÜ]/g, (matched: string) => {
        return accentMap[matched];
    });
}

const filterHelper = (search: string, chain: string) => {
    const searchLower = removeAccents(search.toLocaleLowerCase());
    const candenaLower = removeAccents(chain.toLocaleLowerCase());

    if (candenaLower.indexOf(searchLower) !== -1) {
        return true;
    }
    return false;
}

const searchInput = document.getElementById('search-character');
const filterButton = document.getElementById('btn-filter');

const filterByName = () => {
    const searchValue = (searchInput as HTMLInputElement).value;
    const filteredCharacters = data.filter(character => filterHelper(searchValue, character.nombre));

    const message = document.getElementById('message')
    const cardsDiv = document.getElementById('cards');

    if (filteredCharacters.length === 0) {
        if (message && message instanceof HTMLParagraphElement) {
            message.textContent = 'No se encontraron personajes con este nombre'

            if (cardsDiv) {
                while (cardsDiv.firstChild) {
                    cardsDiv.removeChild(cardsDiv.firstChild);
                }
            }
        }
    } else {
        displayFilteredCharacters(filteredCharacters);
    }
}

if (filterButton && searchInput) {
    filterButton.addEventListener('click', filterByName);
}

const displayFilteredCharacters = (filteredCharacters: Character[]) => {
    const cardsDiv = document.getElementById('cards');

    if (cardsDiv) {
        while (cardsDiv.firstChild) {
            cardsDiv.removeChild(cardsDiv.firstChild);
        }
    }

    for (const character of filteredCharacters) {
        const card = buildCard(character);

        if (cardsDiv) {
            cardsDiv.appendChild(card)
        }
    }
}
