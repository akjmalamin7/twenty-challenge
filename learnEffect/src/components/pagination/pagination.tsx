import { useState } from "react";

function getPagination(
  current: number,
  total: number,
  delta: number = 1
): (number | string)[] {

  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  // প্রথম 1 থেকে শেষ total পর্যন্ত লিস্ট
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || // প্রথম
      i === total || // শেষ
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }
  console.log(range)

  for (const i of range) {
    if (l) {
      if ((i as number) - l === 2) {
        // মাঝখানে ১ গ্যাপ থাকলে সরাসরি সংখ্যাটা বসাও
        rangeWithDots.push(l + 1);
      } else if ((i as number) - l > 2) {
        // বড় গ্যাপ হলে ...
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i as number;
  }

  return rangeWithDots;
}

type Props = {
  totalPages: number;
  initialPage?: number;
};

const Pagination = ({ totalPages, initialPage = 1 }: Props) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const pages = getPagination(currentPage, totalPages, 1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Prev button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-2">
            …
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => goToPage(p as number)}
            className={`px-3 py-1 rounded border ${currentPage === p ? "bg-blue-500 text-white" : ""
              }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
