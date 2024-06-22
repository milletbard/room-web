"use client";

import React from "react";
import RoomAllocation from "@/components/RoomAllocation";
import LocationSelect from "@/components/LocationSelect";

const Search = ({ params }: { params: { city: string } }) => {
  return (
    <div>
      <LocationSelect />
      <RoomAllocation />
    </div>
  );
};

export default Search;
