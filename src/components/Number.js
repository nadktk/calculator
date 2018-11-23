import React from 'react';
import PropTypes from 'prop-types';

const Number = ({ id, style, display }) => {
  const idArray = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  return (
    <button
      type="button"
      id={idArray[id]}
      onClick={() => display(id)}
      className="number"
      style={style}
    >
      {id}
    </button>
  );
};

Number.defaultProps = {
  style: {},
};

Number.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.shape(),
  display: PropTypes.func.isRequired,
};

export default Number;
