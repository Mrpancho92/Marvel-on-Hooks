import {useHttp} from "../hooks/http.hook";


const  useMarvelService = () => {
    
    const {loading, request, error, clearError} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=1f77ab1b7a55db4504a75980239d5ccb';
   const _baseOffset = 210;

    // getResource = async (url) => {
    //     let res = await fetch(url);
        
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
         
    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?issueNumber=1&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
     }



   const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            // description: comics.description ? `${comics.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices.price
        }
    }

    return {
        loading, error, 
        clearError, 
        getAllCharacters, 
        getCharacter,
        getAllComics
    }
}

export default useMarvelService;