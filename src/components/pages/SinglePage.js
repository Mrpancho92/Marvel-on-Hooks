import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';


// Хотелось бы вынести функцию по загрузке данных как отдельный аргумент
// Но тогда мы потеряем связь со стэйтами загрузки и ошибки
// А если вынесем их все в App.js - то они будут одни на все страницы

const SinglePage = ({Component, dataType}) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const {/*  loading, error, */ getComic, clearError, getCharacter, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            default: break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
            {/* {errorMessage}
            {spinner}
            {content} */}
        </>
    )
}

// const View = ({ comic }) => {
//     const {title, description, pageCount, thumbnail, language, price} = comic;
//     return (
//         <div className="single-comic">
//             <img src={thumbnail} alt={title} className="single-comic__img" />
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <Link to="/comics" className="single-comic__back">Back to all</Link>
//         </div>
//     )
// }

export default SinglePage;