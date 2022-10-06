import React from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames";
import LeftIcon from "../../assets/icons/pagination-left-arrow.svg";
import RightIcon from "../../assets/icons/pagination-right-arrow.svg";
export default function Pagination(props) {
  const { pages = 1, current = 1, wrapperClass, onClick } = props;

  const onPrev = () => onClick && onClick(current - 1);
  const onNext = () => onClick && onClick(current + 1);
  const onPrevDash = () => onClick && onClick(current - 2);
  const onNextDash = () => onClick && onClick(current + 2);
  const onFirst = () => onClick && onClick(1);
  const onLast = () => onClick && onClick(pages);

  return (
    // <div>
    <div className={styles.paginationContentAlignment}>
      {current !== 1 ? (
        <div onClick={onPrev} className={styles.leftArrow}>
          <img src={LeftIcon} alt="LeftIcon" />
        </div>
      ) : (
        <div className={styles.leftArrowInactive}>
          <img src={LeftIcon} alt="LeftIcon" />
        </div>
      )}

      {current !== 1 && <button onClick={onFirst}>1</button>}
      {current > 3 && <button onClick={onPrevDash}>...</button>}
      {current - 1 > 1 && <button onClick={onPrev}>{current - 1}</button>}
      <button className={classNames(styles.PageCounter, styles.activePage)}>{current}</button>
      {current + 1 < pages && <button onClick={onNext}>{current + 1}</button>}
      {current <= pages - 3 && <button onClick={onNextDash}>...</button>}
      {current !== pages && <button onClick={onLast}>{pages}</button>}
      {current !== pages ? (
        <div onClick={onNext} className={styles.RightArrow}>
          <img src={RightIcon} alt="RightIcon" />
        </div>
      ) : (
        <div className={styles.RightArrowInactive}>
          <img src={RightIcon} alt="RightIcon" />
        </div>
      )}
    </div>
    // </div>
  );
}
