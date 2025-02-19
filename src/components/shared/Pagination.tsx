'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const CustomPagination: React.FC<ReusablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }
      if (currentPage > 2) {
        pages.push(currentPage - 1);
      }

      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }

      if (currentPage < totalPages - 1) {
        pages.push(currentPage + 1);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = renderPageNumbers();

  return (
    <Pagination className={`flex gap-3 justify-center ${className}`}>
      <PaginationPrevious
        className="cursor-pointer bg-slate-200 hover:opacity-50"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />

      <PaginationContent className="flex gap-2">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === page}
                className={`cursor-pointer px-3 py-1 ${
                  currentPage === page ? 'bg-slate-200' : 'bg-transparent text-slate-500 hover:opacity-50'
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={index} />
          )
        )}
      </PaginationContent>

      <PaginationNext
        className="cursor-pointer bg-slate-200 hover:opacity-50  "
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      />
    </Pagination>
  );
};

export default CustomPagination;
