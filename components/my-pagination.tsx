"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export function MyPagination({
  currentPage,
  totalPages,
  changePage,
}: {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
}) {
  const decreasePage = () => {
    if (currentPage > 1) changePage(currentPage - 1);
  };

  const increasePage = () => {
    if (currentPage < totalPages) changePage(currentPage + 1);
  };

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
    }

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              "cursor-pointer",
              currentPage === 1 && "cursor-default"
            )}
            onClick={decreasePage}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {pages.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                className="cursor-pointer"
                isActive={page === currentPage}
                onClick={() => changePage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              "cursor-pointer",
              currentPage === totalPages && "cursor-default"
            )}
            onClick={increasePage}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
