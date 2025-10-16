import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';

import { useSearchParams } from "react-router";
import { setPricing } from "../feature/contentSlice";

function PricingFilters() {
  const filters = useSelector(s => s.contents.filters.pricing);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const toggle = (key) => {
    const payload = { [key]: !filters[key] };
    dispatch(setPricing(payload));

    // update URL
    if (!filters[key]) {
      searchParams.set(key, "1");
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // initialize from URL flags
    const init = {};
    ["paid", "free", "viewOnly"].forEach(k => {
      const v = searchParams.get(k);
      init[k] = v === "1";
    });
    dispatch(setPricing(init));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex gap-4">
      <label style={{PaddingRight:"15px"}}>Price option</label>
      <label style={{marginRight:"15px", marginLeft:"15px"}} className="flex items-center gap-6">
        <input type="checkbox" checked={!!filters.paid} onChange={() => toggle("paid")} /> Paid
      </label>
      <label style={{marginRight:"15px"}} className="flex items-center gap-2">
        <input type="checkbox" checked={!!filters.free} onChange={() => toggle("free")} /> Free
      </label>
      <label style={{marginRight:"15px"}} className="flex items-center gap-2">
        <input type="checkbox" checked={!!filters.viewOnly} onChange={() => toggle("viewOnly")} /> View Only
      </label>
    </div>
  );
}

export default PricingFilters;