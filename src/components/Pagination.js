import React from "react";
import Button from "@material-ui/core/Button";


const Pagination = (props) => {
    const prevDisabled = props.page === 1;
    const nextDisabled = props.page === Math.ceil(props.totalResults / 10);
    const elementsFrom = Math.ceil(10 * (props.page - 1) + 1);
    const elementsTo = nextDisabled ? props.totalResults : Math.ceil(10 * props.page);
    const onChangePage = (page) => {
        props.changePage(page);
    }
    return (
        <>
            <Button size="small" disabled>{elementsFrom}-{elementsTo} from {props.totalResults}</Button>
            <Button size="small" onClick={onChangePage.bind(this, props.page - 1)} disabled={prevDisabled}>Prev</Button>
            <Button size="small" onClick={onChangePage.bind(this, props.page + 1)} disabled={nextDisabled}>Next</Button>
        </>
    );
}

export default Pagination;