"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BaseReactSelect = dynamic(() => import("react-select"));

type ReactSelectComponentType = typeof BaseReactSelect;

type ReactSelectPropsType = React.ComponentProps<ReactSelectComponentType>;

const ReactSelect = (props: ReactSelectPropsType) => {
  const [isMounted, setIsMounted] = useState(false);

  // fix: Extra attributes from the server error
  // https://github.com/JedWatson/react-select/issues/5459
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <BaseReactSelect {...props} />;
};

export default ReactSelect;
