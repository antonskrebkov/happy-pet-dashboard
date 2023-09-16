import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { MutationActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { SetStateAction, useCallback, useRef } from "react";

const useDebounce = <T>(
  callback: (
    arg: string
  ) => MutationActionCreatorResult<
    MutationDefinition<
      string,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      "",
      any,
      ""
    >
  >,
  delay: number,
  setter: (value: SetStateAction<T>) => void
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const debouncedCallback = useCallback(
    (arg: string) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(arg)
          .unwrap()
          .then((res) => setter(res));
      }, delay);
    },
    [callback, delay, setter]
  );

  return debouncedCallback;
};

export default useDebounce;
