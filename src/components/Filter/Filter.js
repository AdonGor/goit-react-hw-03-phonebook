import PropTypes from 'prop-types';

function Filter({ value, changeFilter }) {
    return (
      <label>
        Find contacts by name
        <input
          name="filter"
          type="text"
          value={value}
          onChange={event => changeFilter(event.target.value)}
        />
      </label>
    );
  }

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired,
}

export default Filter;