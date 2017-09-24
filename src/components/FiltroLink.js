import React from 'react';
import {FlatButton,RaisedButton} from 'material-ui';

const FiltroLink = ({children, filtro, current, onClick}) => (
  <span className="w3-third w3-container">
  	{current === filtro?
        <RaisedButton
          fullWidth={true}
          label={children}
          primary={true}
        />
  		:
        <FlatButton
            fullWidth={true}
            label={children}
            primary={true}
            onClick={onClick}
        />
  	}
  </span>
);

export default FiltroLink;