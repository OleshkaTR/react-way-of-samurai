import React, {useState} from 'react';
import classes from './Pagination.module.css';

const Pagination = ({totalCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={classes.pagination}>
        {portionNumber > 1 && <button onClick={() => setPortionNNumber(portionNumber - 1)}>PREV</button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => <span
                    className={currentPage === p ? classes.selectPage : classes.pageNumber}
                    key={p}
                    onClick={() => onPageChanged(p)}
                >
                        {p}
                    </span>
            )}

        {portionCount > portionNumber && <button
            onClick={() => setPortionNNumber(portionNumber + 1)}
        >NEXT</button>}
    </div>;
};

export default Pagination;
