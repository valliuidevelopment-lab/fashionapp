import React from "react";


function Filters(items, filters) {
  const { pricing, keyword, priceRange } = filters;
  let result = items.slice();

  const pricingSelected = pricing.paid || pricing.free || pricing.viewOnly;
  if (pricingSelected) {
    result = result.filter((it) => {
  
      if (pricing.paid && it.pricingOption === 1) {
        const price = Number(it.price || 0);
        return price >= priceRange[0] && price <= priceRange[1];
      }
      if (pricing.free && it.pricingOption === 0) {
        return true;
      }
      if (pricing.viewOnly && String(it.type || "").toLowerCase().includes("view")) {
        return true;
      }
      return false;
    });
  }


  const kw = (keyword || "").trim().toLowerCase();
  if (kw) {
    result = result.filter((it) => {
      const creator = (it.creator || "").toString().toLowerCase();
      const title = (it.title || "").toString().toLowerCase();
      return creator.includes(kw) || title.includes(kw);
    });
  }

  return result;
}

export default Filters;



