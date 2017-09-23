import React from 'react';
import {FlatButton,RaisedButton} from 'material-ui';

const FiltroLink = ({children, filtro, current, onClick}) => (
  <span>
  	{current === filtro?
        <RaisedButton
          label={children}
          primary={true}
        />
  		:
        <FlatButton
            label={children}
            primary={true}
            onClick={onClick}
        />
  	}
  </span>
);

export default FiltroLink;