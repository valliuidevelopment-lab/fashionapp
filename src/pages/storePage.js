import React from "react";
import ResetButton from '../components/resetbutton';
import ContentGrid from "../components/ContentGrid";
import SearchBar from "../components/SearchBar";
import PricingFilters from "../components/priceFilters";
import { Link } from "react-router-dom";

function StorePage() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <div class="container-fluid">

        <Link className="navbar-brand" to="/">
  <img
    src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
    alt="Logo"
    width="80"
    height="40"
  />
</Link>

   
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarRight"
      aria-controls="navbarRight" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    
    <div class="collapse navbar-collapse justify-content-end" id="navbarRight">
      <ul class="navbar-nav mb-2 mb-lg-0">


        <li class="nav-item">
          <button class=" btn btn-success">Required Feature</button>
        </li>

      </ul>
    </div>

  </div>
</nav>
    <div className="main-conttent-area p-5">
      
     <div className="row">
          <SearchBar />
        </div>
      <div className="row">
        
        <div className="col-md-12 border border-2 border border-success p-3 rounded-3 d-flex">

          <div className="col-md-6"><PricingFilters /></div>
          <div className="col-md-6 items-center justify-end float-end"><ResetButton /></div>
          
        </div>
        <h5 className="text-success mt-5">Contents List</h5>
        <ContentGrid />
      </div>

      
    </div>
    </>
    
  );
}

export default StorePage;