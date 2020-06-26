import React, { useState, useEffect } from 'react';
import './PageTabs.scss';

const NUMTABS = 9;

export type PageTabsProps = {
  numPages: number,
  currentPage: number,
  setCurrentPage: Function
}

const PageTabs = (props: PageTabsProps) => {
  const pageLinks = [];

  let i = 0
  if (props.currentPage > NUMTABS / 2 + 1) {
    if (props.numPages - props.currentPage < NUMTABS / 2 + 1) {
      i = props.numPages - 8;
    } else {
      i = props.currentPage - 4;
    }
  } else {
    i = 1;
  }
  let top = 0;
  if (props.numPages < 9) {
    top = props.numPages;
  } else if (props.currentPage < 6) {
    top = NUMTABS;
  } else {
    top = props.numPages - props.currentPage < NUMTABS / 2 + 1
      ? props.numPages
      : props.currentPage + 4;
  }
  for (i; i <= top; i++) {
    pageLinks.push(
      <button
        className={`pagelink${i === props.currentPage ? ' current' : ''}`}
        key={i}
        value={i}
        onClick={(e: any) => {
          props.setCurrentPage(parseInt(e.target.value))
        }}
      >
        {i}
      </button>
    )
  }

  return (
    <div className='pagetabs-container'>
      {pageLinks}
    </div>
  )
}

export default PageTabs;