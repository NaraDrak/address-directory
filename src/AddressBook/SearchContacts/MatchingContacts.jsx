import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./MatchingContacts.css";

function MatchingContacts({data, highlightedIndex, downshiftGetMenuProps, downshiftGetItemProps}) {
  return (
    <ul
      {...downshiftGetMenuProps()}
      className="MatchingContacts"
    >
      {data.map((item) => (
        <li key={highlightedIndex}
          {...downshiftGetItemProps({
            key: item.id,
            item: item,
            payload: data,
            className: classNames(
              "MatchingContacts_item",
              {
                "MatchingContacts_item_highlighted": false,
              }),
          })}
        >
          {item.value}
        </li>
      ))}
    </ul>
  );
}

MatchingContacts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  highlightedIndex: PropTypes.number,
  downshiftGetMenuProps: PropTypes.func.isRequired,
  downshiftGetItemProps: PropTypes.func.isRequired,
};

export default MatchingContacts;