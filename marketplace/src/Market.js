import React from 'react';
import './App.css';

function Market({ user }) {
  return (
    <div>
      <div className="card" style={{ width: "20%" }}>
        <img src="https://icons.getbootstrap.com/assets/img/icons-hero@2x.png" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">product name</h5>
          <p className="card-text">description</p>
        </div> 
        <ul class="list-group list-group-flush">
    <li class="list-group-item">cost</li>
    <li class="list-group-item">how many in stock</li>
    <li class="list-group-item">seller username</li>
  </ul>
        <div className="card-body">
          <a href="#" className="card-link">Connect</a>
        </div>
      </div>
    </div>
  );
}

export default Market;
