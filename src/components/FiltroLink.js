import React from 'react';

const FiltroLink = ({children, filtro, current, onClick}) => (
  <span>
  	{current === filtro?
  		<span className="w3-btn w3-blue">{children}</span>
  		:
  		<button  className=" w3-btn"
  		onClick={onClick}
  		href="#!">
        	{children}
        </button>
  	}
  </span>
);

export default FiltroLink;