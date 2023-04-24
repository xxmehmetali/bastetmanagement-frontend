import { Accordion, Pagination } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PaginationComponent({ totalPages, currentPage }: any) {
    const navigate = useNavigate();
    const paginationElements = [];

    for (let i = 0; i < totalPages; i++) {
        paginationElements.push(
            <Pagination.Item onClick={() => { (handleNavigateToPage(i)) }} active={i == Number(currentPage)}>{i + 1}</Pagination.Item>
        );
    }

    function handleNavigateToPage(page: Number) {
        navigate('?page=' + page.toString())
    }
    return (
        <Pagination>
            {paginationElements}
        </Pagination>
    );
}
