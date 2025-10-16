import React,{useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setKeyword } from "../feature/contentSlice"; 
import { useSearchParams } from "react-router";

function SearchBar() {
    const dispatch = useDispatch();
  const keyword = useSelector(state => state.contents.filters.keyword);
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (e) => {
    const v = e.target.value;
    dispatch(setKeyword(v));
    // persist in URL
    if (v) {
      searchParams.set("q", v);
    } else {
      searchParams.delete("q");
    }
    setSearchParams(searchParams);
  };
  useEffect(() => {
    // initialize from URL
    const q = searchParams.get("q") || "";
    if (q !== keyword) dispatch(setKeyword(q));
    // eslint-disable-next-line
  }, []);
    return ( 
        <div className="px-0">
            <input type="search"
      aria-label="search"
      className="border rounded px-3 py-2 my-4 w-full col-md-12"
      placeholder="Find the items you Looking for"
      value={keyword}
      onChange={onChange}
    />
        </div>
     );
}

export default SearchBar;



