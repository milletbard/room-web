"use client";

import React from "react";
import RoomAllocation from "@/components/RoomAllocation";
import LocationSelector from "@/components/LocationSelector";
import { guestB, roomsB, guestOptions, roomsOptions } from "@/data/data";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const searchParams = useSearchParams();

  const guestType = searchParams.get("guestType");
  const roomsType = searchParams.get("roomsType");

  const guest = guestOptions.find((option) => option.type === guestType);
  const room = roomsOptions.find((option) => option.type === roomsType);

  return (
    <div>
      <div className="min-w-[600px]">
        <LocationSelector guest={guestB} />
      </div>
      <RoomAllocation
        guest={guest?.value || guestB}
        rooms={room?.value || roomsB}
        onChange={(result) => console.log(result)}
      />
    </div>
  );
};

export default Search;
