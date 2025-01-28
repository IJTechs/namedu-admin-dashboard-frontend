'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
  className?: string;
}

const CustomPagination: React.FC<ReusablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  return (
    <Pagination className={` flex gap-3 justify-center ${className}`}>
      <PaginationPrevious
        className="cursor-pointer bg-secondary-bold text-secondary-strong hover:text-grayLight"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      />

      <PaginationContent className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPage === index + 1}
              className={`cursor-pointer px-3 py-1 ${
                currentPage === index + 1
                  ? 'bg-secondary-bold text-white'
                  : 'bg-transparent text-tintBlue hover:bg-secondary-bold '
              }`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>

      <PaginationNext
        className="cursor-pointer bg-secondary-bold text-secondary-strong hover:text-grayLight"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      />
    </Pagination>
  );
};

export default CustomPagination;
