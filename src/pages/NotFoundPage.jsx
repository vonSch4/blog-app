import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <div>Sorry, page not found</div>
      <div>
        Do you want to return to the <Link to='articles'>main page</Link>?
      </div>
    </>
  );
}

export default NotFoundPage;
