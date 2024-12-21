"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

import useLogRecordsStore from "@/src/hooks/use-log-records-store";
import { Button } from "../../ui/button";

export default function LogTablePagination() {
  const store = useLogRecordsStore();

  // Definir cuántas páginas se deben mostrar por pantalla.
  const maxVisiblePages = 3;

  // Generar la lista de páginas
  const generatePages = () => {
    const pages = [];
    const totalPages = store.totalPages();
    const currentPage = store.page;

    if (totalPages <= maxVisiblePages) {
      // Si el total de páginas es menor o igual al límite visible, mostrar todas.
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si hay más páginas que las que podemos mostrar, usar puntos suspensivos
      if (currentPage <= maxVisiblePages - 1) {
        // Mostrar las primeras páginas y la última.
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        // Mostrar las últimas páginas y la primera.
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Mostrar páginas cercanas al número actual, con puntos suspensivos en los extremos.
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
      store.records.length > 0 && (
          <Pagination className="rounded-sm bg-white px-[clamp(10px,2vw,10rem)] py-[clamp(8px,2vh,8rem)] dark:bg-slate-900">
            <PaginationContent>
              <PaginationItem>
                <Button variant='secondary' onClick={(e) => {
                  e.preventDefault();
                  store.previous();
                }}>
                  👈
                </Button>
              </PaginationItem>

              {generatePages().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "..." ? (
                        <PaginationEllipsis />
                    ) : (
                        // Asegurarse de que solo pasemos números al PaginationLink
                        <PaginationLink
                            isActive={store.page === page}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              store.setPage(page as number); // Forzamos el tipo aquí
                            }}
                        >
                          {page}
                        </PaginationLink>
                    )}
                  </PaginationItem>
              ))}

              <PaginationItem>
                <Button variant='secondary' onClick={(e) => {
                  e.preventDefault();
                  store.next();
                }}>
                  👉
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      )
  );
}
