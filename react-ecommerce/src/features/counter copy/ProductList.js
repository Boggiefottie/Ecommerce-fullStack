import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "./counterSlice";

export function ProductList() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div></div>
    </div>
  );
}
