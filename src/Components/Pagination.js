import React, { useEffect, useState } from "react";

export default function Pagination({
  showPerPage,
  handleSetPagination,
  total,
}) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    let value = showPerPage * counter;
    let start = value - showPerPage;
    let end = value;

    handleSetPagination(start, end);
 
  }, [counter]);

  const prev = () => {
    if (counter === 1) {
      setCounter(1);
    } else {
      setCounter(counter - 1);
    }
    // console.log(counter);
  };
  const next = () => {
    if (counter === Math.ceil(total / showPerPage)) {
      setCounter(counter);
    } else {
      setCounter(counter + 1);
    }
    // console.log(counter);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={prev}>
            Previous
          </button>
        </li>
        {new Array(Math.ceil(total / showPerPage)).fill("").map((ob, idx) => {
          return (
            <li key={idx}
              className={`page-item ${idx + 1 === counter ? "active" : null}`}
            >
              <button className="page-link" onClick={() => setCounter(idx + 1)}>
                {idx + 1}
              </button>
            </li>
          );
        })}

        <li className="page-item">
          <button className="page-link" onClick={next}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
