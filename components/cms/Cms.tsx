import React from 'react';

interface PageProps {
  pageType: string;
}

const Cms = ({ pageType }: PageProps) => {
  return (
    <div>
      <h1>This is CMS page</h1>
      page type from URL resolver is {pageType}
    </div>
  );
};

export default Cms;
