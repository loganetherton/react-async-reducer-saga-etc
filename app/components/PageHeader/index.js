import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PageHeaderTop = styled.div``;

const PageHeaderSmall = styled.small`
  display: block;
  font-size: 12px;
  color: #909FA7;
`;

function PageHeader(header, subTitle) {
  return (
    <div className="content-heading">
      <PageHeaderTop>{header} {subTitle && <PageHeaderSmall>{subTitle}</PageHeaderSmall>}</PageHeaderTop>
    </div>
  );
}

PageHeader.propTypes = {
  header: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};

export default PageHeader;
