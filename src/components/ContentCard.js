
import React, { useEffect, useState } from "react";

function ContentCard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://closet-recruiting-api.azurewebsites.net/api/data")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

 
  return (
    <div className="row d-flex justify-content-between px-2">    
      {items.map((item) => (
        <div
          key={item.id}
          
          className=" card-customize-area h-50 card col-xs-12 col-sm-6 col-md-4 mb-4 mt-4 border rounded overflow-hidden bg-white shadow hover:shadow-lg transition"
        >
          <img
            src={item.imagePath}
            alt={item.title}
            className="img-fluid card-img-top card-customize"
            style={{    height: '250px',    width: '100%',     objectFit: 'cover'    }}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/300x200?text=No+Image")
            }
          />
          <div className="card-body">
            <div className="row">
              <div className="col-md-9 col-lg-8 col-xl-8">
                <div className="text-sm text-gray-500 card-title">{item.creator}</div>
                <div className="font-medium truncate card-text">{item.title}</div>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
              <div className="mt-2 text-sm flex items-center float-end">
              <span className="px-2 py-1 text-xl text-uppercase fw-bolder">
                {item.pricingOption === 0 ? "Free" : "Paid"}
              </span>
              {item.pricingOption !== 0 && item.price != null && (
                <span className="ml-2 fw-bold font-large">${item.price}</span>
              )}
            </div>
              </div>
            </div>
            
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContentCard;

