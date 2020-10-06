const API_KEY = process.env["REACT_APP_API_KEY"];

const getTranslateWord = async (text, lang = 'en-ru') => {
    const res = await fetch(`https://reactmarathon-api.netlify.app/api/translate?text=${text}&lang=${lang}`,{
        headers: {
            'Authorization': API_KEY
        }
    });
    const body = await res.json();

    return body;
}

export default getTranslateWord;