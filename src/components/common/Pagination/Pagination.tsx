import { Button } from 'antd';
import React, {FC, useState} from 'react';

import classes from './Pagination.module.css';

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
};

const Pagination: FC<PropsType> = ({
                                       totalCount,
                                       pageSize,
                                       currentPage = 1,
                                       onPageChanged = x => x,
                                       portionSize = 10
                                   }) => {

    let pagesCount = Math.ceil(totalCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={classes.pagination}>
        {portionNumber > 1 && <Button onClick={() => setPortionNNumber(portionNumber - 1)}>PREV</Button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => <span
                    className={currentPage === p ? classes.selectPage : classes.pageNumber}
                    key={p}
                    onClick={() => onPageChanged(p)}
                >
                        {p}
                    </span>
            )}

        {portionCount > portionNumber && <Button
            onClick={() => setPortionNNumber(portionNumber + 1)}
        >NEXT</Button>}
    </div>;
};

export default Pagination;
