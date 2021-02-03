import React, { useState } from 'react'
import { Box, Grommet, RadioButtonGroup } from 'grommet';
import { TextInput } from 'grommet';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};



const allSuggestions = Array(100)
  .fill()
  .map((_, i) => `${i + 1} suggestion`);



const CommuteDistanceControls = (props) => {
    const [suggestions, setSuggestions] = React.useState(allSuggestions);
    const [value, setValue] = React.useState('');
    const [selection, setSelection] = useState('c1')

    const onChange = event => {
      console.log(event)
      const nextValue = event.target.value;
      setValue(nextValue);
      if (!nextValue) setSuggestions(allSuggestions);
      else {
        const regexp = new RegExp(`^${nextValue}`);
        setSuggestions(allSuggestions.filter(s => regexp.test(s)));
      }
    };

    const onSuggestionSelect = event => {
      console.log(event)
      setValue(event.suggestion);
    };

  return (
  <>
    <RadioButtonGroup
    name="radio"
    options={[
      { label: 'Walk', value: 'c1' },
      { label: 'Drive', value: 'c2' },
      { label: 'Public Transit', value: 'c3' },
    ]}

    value={selection}
    onChange={event => setSelection(event.target.value)}
    {...props}
  />
    {/* <TextInput
      value={value}
      onChange={onChange}
      onSuggestionSelect={onSuggestionSelect}
      suggestions={suggestions}
    /> */}
    <PlacesAutocomplete></PlacesAutocomplete>
  </>
  )
}


export default CommuteDistanceControls
