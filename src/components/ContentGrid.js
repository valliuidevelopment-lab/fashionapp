import React, {useMemo, useEffect, useCallback} from "react";
import ContentCard from "./ContentCard";
import InfiniteScroll from '../hooks/InfiniteScroll';
import Filters from '../components/Filter';
import { useSelector, useDispatch } from 'react-redux';
import {incrementPage} from '../feature/contentSlice';
import {fetchContents} from '../feature/contentSlice';

const PAGE_SIZE = 20; //

function ContentGrid() {

  const dispatch = useDispatch();
  const { items, status, filters, page } = useSelector(s => s.contents);

  // Filtered items
  const filtered = useMemo(() => Filters(items, filters), [items, filters]);


  const start = 0;
  const end = page * PAGE_SIZE;
  const visible = filtered.slice(start, end);
  const hasMore = end < filtered.length;

  useEffect(() => {
    if (status === "idle") dispatch(fetchContents());
  }, [status, dispatch]);

  const loadMore = useCallback(() => {
    if (hasMore) dispatch(incrementPage());
  }, [hasMore, dispatch]);

  const lastRef = InfiniteScroll(loadMore, { rootMargin: "200px" });


  return (
    <div className="border border-2 border-success rounded-3 ">
     
        {visible.map((it, idx) => {
          if (idx === visible.length - 1) {
            return <div className="" key={it.id || idx} ref={lastRef}><ContentCard item={it} /></div>;
          }
          return <div className="" key={it.id || idx}><ContentCard  item={it} /></div>;
        })}
    

      {status === "loading" && <div className="mt-4">Loading...</div>}
      {!hasMore && filtered.length === 0 && status === "succeeded" && <div className="mt-4">No results</div>}
    </div>
  );
}

export default ContentGrid;