import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  finishInitialLoad,
  selectAccessToken,
  setAuth,
  selectRefreshToken,
} from "@/redux/features/authSlice";
import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { useSelector } from "react-redux";

export default function useVerify() {
  const dispatch = useAppDispatch();

  const [verify] = useVerifyMutation();

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  useEffect(() => {
    verify({ accessToken })
      .unwrap()
      .then(() => {
        dispatch(setAuth({ access: accessToken, refresh: refreshToken }));
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);
}
