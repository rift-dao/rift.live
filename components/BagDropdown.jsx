import { useState } from 'react';
import PropTypes from 'prop-types';

import helpers from 'utils/helpers';

import Dropdown from './common/Dropdown';

function BagDropdown({ bags, defaultValue, onChange, ...rest }) {
  const [selectedBag, setSelectedBag] = useState(defaultValue);
  return (
    <Dropdown
      onChange={({ value }) => {
        setSelectedBag(bags.indexOf(value));
        onChange(bags.indexOf(value));
      }}
      selectedOption={selectedBag}
      light
      options={bags.map((bag) => ({
        label: helpers.displayBag(bag),
        value: bag,
      }))}
      {...rest}
    />
  );
}

BagDropdown.propTypes = {
  bags: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

BagDropdown.defaultProps = {
  defaultValue: '',
};

export default BagDropdown;
