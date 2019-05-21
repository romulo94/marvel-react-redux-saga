import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ element }) => (
  <>
    <span>
      <strong>Name:</strong> {element.name}
    </span>
    <span>
      <strong>Description:</strong> {element.description}
    </span>
    <span>
      <strong>Number comics:</strong> {element.comics.available}
    </span>
    <span>
      <strong>Number series:</strong> {element.series.available}
    </span>
    <span>
      <strong>Number stories:</strong>
      {element.stories.available}
    </span>
  </>
);

Content.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    comics: PropTypes.shape({
      available: PropTypes.number,
    }),
    series: PropTypes.shape({
      available: PropTypes.number,
    }),
    stories: PropTypes.shape({
      available: PropTypes.number,
    }),
  }).isRequired,
};

export default Content;
