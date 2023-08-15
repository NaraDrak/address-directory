import Downshift from "downshift";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

import { selectMatchingContact, updateSearchPhrase } from "../actions";
import MatchingContacts from "./MatchingContacts";
import PhraseInput from "./PhraseInput";
import SearchFailure from "./SearchFailure";

import "./SearchContacts.css";

const SearchContacts = ({phrase, matchingContacts=[], hasFailedToSearch}) => {
  
  const dispatch = useDispatch();
  const onPhraseChange = (newPhrase) => dispatch(updateSearchPhrase(newPhrase));

//ESTA FUNCIÓN RECIBE EL CONTACTO QUE ELEGIMOS 
  function onMatchingContactSelect(selectedMatchingContact) {
    return dispatch(selectMatchingContact(selectedMatchingContact));
  }

  return (
    <section className="SearchContacts">
      <Downshift
        itemToString={item => (item ? item.value : "")}
        onChange={function (item) {
          return onMatchingContactSelect(item);
        }}
      >
        {({
            isOpen,
            highlightedIndex,
            getInputProps,
            getMenuProps,
            getItemProps,
          }) => (
          <div>
            <PhraseInput
              phrase={phrase}
              onPhraseChange={onPhraseChange}
              downshiftGetInputProps={getInputProps}
            />
            {
              isOpen && (
                <MatchingContacts
                  data={matchingContacts}
                  highlightedIndex={highlightedIndex}
                  downshiftGetMenuProps={getMenuProps}
                  downshiftGetItemProps={getItemProps}
                />
              )}
          </div>
        )}
      </Downshift>
      {hasFailedToSearch && (
        <SearchFailure className="SearchContacts_failure" />
      )}
    </section>
  );
};

SearchContacts.propTypes = {
  phrase: PropTypes.string.isRequired,
  matchingContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  hasFailedToSearch: PropTypes.bool.isRequired,
};

export default SearchContacts;
