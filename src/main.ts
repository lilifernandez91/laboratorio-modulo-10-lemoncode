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
        throw new Error('Error al obtener las películas');
    }
}

const buildCard = (character: Character): HTMLElement => {

    const cardCharacter = document.createElement('div-card');
    cardCharacter.classList.add('div-card');

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = `http://localhost:3000//${character.imagen}`;
    cardCharacter.appendChild(image);

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    const name = document.createElement('div');
    name.classList.add('div-name');
    name.textContent = `Nombre: ${character.nombre}`;
    textContainer.appendChild(name);

    const specialty = document.createElement('div')
    specialty.classList.add('div-specialty');
    specialty.textContent = `Especialidad: ${character.especialidad}`;
    textContainer.appendChild(specialty);

    const skills = document.createElement('div');
    skills.classList.add('div.skills');
    skills.textContent = `Habilidades: ${character.habilidades.join(',')}`;
    textContainer.appendChild(skills);

    cardCharacter.appendChild(textContainer);

    return cardCharacter;
}

const containerCard = (characters: Character[]) => {

    const cardsDiv = document.getElementById('cards')

    for (const character of characters) {
        const card = buildCard(character) // retornar el HTML correspondiente a UNA tarjeta
        if (cardsDiv) {
            cardsDiv.appendChild(card);
        }
    }
}

const data = await getData()
containerCard(data)
