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
  let leftArrowFlag = false;
  let rightArrowFlag = false;
  pageLinks.push(
    <button
      className={`pagelink${1 === props.currentPage ? ' current' : ''}`}
      key={1}
      onClick={() => {
        props.setCurrentPage(1)
      }}
    >{1}</button>
  )
  if (props.currentPage > NUMTABS / 2 + 1) {
    leftArrowFlag = true;
    if (props.numPages - props.currentPage < NUMTABS / 2 + 1) {
      i = props.numPages - NUMTABS + 2;
    } else {
      i = props.currentPage - Math.floor(NUMTABS / 2) + 1;
    }
  } else {
    i = 2;
  }
  let top = 0;
  if (props.numPages < NUMTABS) {
    top = props.numPages;
  } else if (props.currentPage <= NUMTABS / 2 + 1) {
    rightArrowFlag = true;
    top = NUMTABS - 2;
  } else {
    if (props.numPages - props.currentPage < NUMTABS / 2 + 1) {
      top = props.numPages;
    } else {
      rightArrowFlag = true;
      top = props.currentPage + Math.floor(NUMTABS / 2) - 1;
    }
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
      >{i}</button>)
  }

  if (leftArrowFlag) {
    pageLinks[1] =
      <button
        key='left-arrow'
        onClick={(e: any) => {
          props.setCurrentPage(props.currentPage - 1)
        }}
      >{`<<`}</button>
  }
  if (rightArrowFlag) {
    pageLinks[NUMTABS - 2] =
      <button
        key='right-arrow'
        onClick={(e: any) => {
          props.setCurrentPage(props.currentPage + 1)
        }}
      >{`>>`}</button>
    pageLinks.push(
      <button
        className={`pagelink`}
        key={props.numPages}
        onClick={() => {
          props.setCurrentPage(props.numPages)
        }}
      >{props.numPages}</button>
    )
  }

  return (
    <div className='pagetabs-container'>
      {pageLinks}
    </div>
  )
}

export default PageTabs;