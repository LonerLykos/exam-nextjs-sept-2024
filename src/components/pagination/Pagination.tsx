'use client';
import {FC} from "react";
import "./Pagination.scss"
import classNames from "classnames";
import {useRouter} from "next/navigation";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    type: string;
    tag?: string;
}

export const Pagination: FC<PaginationProps> = ({totalItems, itemsPerPage, currentPage, type, tag}) => {
    const router = useRouter();
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            if (type === 'users') {
                router.push(`/users?page=${newPage}`);
            } else {
                if (tag && type) {
                    router.push(`/recipes/tag=${tag}?page=${newPage}`);
                } else {
                    router.push(`/recipes?page=${newPage}`);
                }
            }
        }
    }

    return (
        <div className={classNames('pagination-wrapper')}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            {Array.from({length: totalPages}, (_, index) => (
                <button className={classNames('number-page')}
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );

}