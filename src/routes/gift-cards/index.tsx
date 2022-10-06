import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllGiftCards } from "../../store/slices/allGiftCardsSlice";
import { useAppDispatch } from "../../store/store";

export default function GiftCards() {
  const dispatch = useAppDispatch();
  const giftCardsState = useSelector((state: any) => state?.allGiftCards);
  const [allGiftCards, setAllGiftCards] = useState([]);

  useEffect(() => {
    if (giftCardsState?.data?.length === 0 && !giftCardsState?.called) {
      dispatch(fetchAllGiftCards());
    } else {
      setAllGiftCards(giftCardsState?.data);
    }
  }, [giftCardsState]);

  return <div>GiftCards</div>;
}
