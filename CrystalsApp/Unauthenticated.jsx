import React from 'react';
// import PropTypes from 'prop-types';

import Container from 'components/common/Container';
import StoryIntro from 'components/StoryIntro';

function Unauthenticated() {
  return (
    <Container>
      <StoryIntro />

      {/* Add wallet connection FAQ stuff? */}
    </Container>
  );
}

Unauthenticated.propTypes = {};

Unauthenticated.defaultProps = {};

export default Unauthenticated;
