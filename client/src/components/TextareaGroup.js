import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackMessage } from 'shared/components';

const TextareaGroup = ({
  textarea: Textarea,
  name,
  text,
  handleChange,
  handleEnterPress,
  placeholder,
  error,
  errorMsg,
}) => (
  <React.Fragment>
    <Textarea
      value={text}
      name={name}
      onChange={handleChange}
      onKeyUp={handleEnterPress}
      placeholder={placeholder}
      error={error}
    />
    {errorMsg ? <FeedbackMessage>{errorMsg}</FeedbackMessage> : ''}
  </React.Fragment>
);

TextareaGroup.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export default TextareaGroup;
