/**
 * Simple stateless route
 */
import React from 'react';
import { Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import ContentWrapper from 'components/ContentWrapper';

const styles = {
  center: {textAlign: 'center'}
};

export class Stateless extends React.Component {

  render() {
    return (
      <ContentWrapper className="content-wrapper">
        <Helmet
          title="Stateless"
          meta={[
            { name: 'description', content: 'Description of stateless' },
          ]}
        />
        <Row>
          <Col sm={12} style={styles.center}>
            <h1>Stateless</h1>
          </Col>
        </Row>
      </ContentWrapper>
    );
  }
}

Stateless.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Stateless);
