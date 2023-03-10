import React from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import Card from '../Card';

import styles from './CardList.module.scss';

function CardList() {
  const articles = useSelector((state) => state.articles.articles);
  const articlesCount = useSelector((state) => state.articles.articlesCount);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleChangePage = ({ selected }) => {
    setSearchParams({ page: selected + 1 });
  };

  const cards = articles.map((article) => (
    <Card key={article.slug} article={article} />
  ));

  return (
    <>
      <ul className={styles.cardList}>{cards}</ul>
      <ReactPaginate
        className={styles.pagination}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        activeClassName={styles.activeItem}
        previousLinkClassName={styles.previousLinkClassName}
        nextLinkClassName={styles.nextLinkClassName}
        forcePage={currentPage - 1}
        pageCount={Math.ceil(articlesCount / 5) || 0}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel='<'
        nextLabel='>'
        onPageChange={handleChangePage}
      />
    </>
  );
}

export default CardList;
