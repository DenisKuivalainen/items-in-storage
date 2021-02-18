import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { compose, length, slice, map, prop, curry, __ } from "ramda";
import { isArray } from "ramda-godlike";
import { useState } from "react";
import Loading from "./Loading";

const BodyCell = (value, width) => (
    <TableCell style={{ minWidth: width }}>
        {value}
    </TableCell>
);

const BodyRow = (cellsValues) => (
    <TableRow hover role="checkbox" tabIndex={-1}>
        {cellsValues}
    </TableRow>
);

const Body = (data) => (
    <TableBody>
        {data}
    </TableBody>
);

const HeadCell = ({label, width}) => (
    <TableCell style={{ minWidth: width }}>
        {label}
    </TableCell>
);

const Head = (columns) => (
    <TableHead>
        <TableRow>
            {columns}
        </TableRow>
    </TableHead>
);

const TableElement = (data, height) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const colomns = [
        {id: "id", label: "ID", width: 150},
        {id: "name", label: "Name", width: 200},
        {id: "manufacturer", label: "Manufacturer", width: 150},
        {id: "price", label: "Price", width: 50},
        {id: "color", label: "Color", width: 100},
        {id: "availability", label: "Availability", width: 50}
    ]

    const head = () => compose(Head, map(HeadCell))(colomns);

    const body = () => {
        const mapCells = curry(
            (product, colomn) => {
                let cellValue = prop(prop("id", colomn), product);
                let cellWidth = prop("width", colomn);
    
                return BodyCell(cellValue, cellWidth);
            }
        );
        const getCells = (product) => map(mapCells(product), colomns);

        const mapRows  = compose(BodyRow, getCells);
        const sliceRowsToPageSize = slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        const getRows = compose(map(mapRows), sliceRowsToPageSize);

        return compose(Body, getRows)(data);
    }


    const handlePageChange = (e, newPage) => {
        setPage(newPage);
    };
    
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    const renderTable = () => (
        <Paper style={{width: "100%"}}>
            <TableContainer style={{maxHeight: height}}>
                <Table stickyHeader aria-label="sticky table">
                    {head()}
                    {body()}
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={length(data)}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
            />
        </Paper>
    );

    return isArray(data) ? renderTable() : Loading();
}

export default TableElement;