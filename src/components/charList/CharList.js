import React, { useState, useEffect, useRef, useMemo } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
// import setContent from '../../utils/setContent';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    // state = {
    //     charList: [],
    //     loading: true,
    //     error: false,
    //     newItemLoading: false,
    //     offset: 210,
    //     charEnded: false
    // }

    const {/* loading, error, */ getAllCharacters, process, setProcess} =  useMarvelService();

    useEffect(() => {
        onRequest(offset , true);
         // eslint-disable-next-line
    }, [])
    // componentDidMount() {
    //     this.onRequest();
    // }
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        // onCharListLoading();
        // setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
            // .catch(onError)
    }

    // const onCharListLoading = () => {
    //     setNewItemLoading(true);
    // }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        // this.setState(({ offset, charList }) => ({
        //     charList: [...charList, ...newCharList],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     charEnded: ended
        // }))
        setCharList(charList => [...charList, ...newCharList]);
        // setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    // const onError = () => {
    //     // this.setState({
    //     //     error: true,
    //     //     loading: false
    //     // })
    //     setError(true);
    //     setLoading(loading => false);
    // }

    const itemRefs = useRef([]);
    // setRef = (ref) => {
    //     this.itemRefs.push(ref);
    // }
    const focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов
        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items = arr.map((item, index) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[index] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(index);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(index);
                        }
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
                </CSSTransition>
            )
        });
        // Добавлен доп фильтр на удаление дубликатов в items, без понятия почему они там образуются.
        // const newItems = items.filter((value, index, self) =>
        //     index === self.findIndex((t) => (t.key === value.key)))
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul
                className="char__grid">
                <TransitionGroup component={null}>
                {items}
                </TransitionGroup>
            </ul>
        )
    }


    // const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;

    // const items = renderItems(charList);

    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading && !newItemLoading ? <Spinner /> : null;
    // if (loading) {
    //     import('./someFunck')
    //             .then(obj => obj.logger())
    //             .catch();
    // }
    // const content = !(loading || error) ? items : null;
    
    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading); 
        // eslint-disable-next-line
    }, [process]);

    return (
        <div className="char__list">
            {/* {errorMessage}
            {spinner} */}
            {/* {content} */}
            {/* {items} */}
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

/* class Concidences extends Component {
    render() {
        return (
            <li ref = {this.myRef}
                className="char__item"
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}>
                <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                <div className="char__name">{item.name}</div>
            </li>
        )
    }
} */

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;



