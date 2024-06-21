"use client";

import DatePicker from "react-datepicker";
import React, { useState } from "react";
import RoomAllocation from "@/components/RoomAllocation";
import dynamic from "next/dynamic";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const ReactSelect = dynamic(() => import("react-select"));

const options = [
  { value: "taipei-city", label: "台北市" },
  { value: "taichung-city", label: "台中市" },
  { value: "kaohsiung-city", label: "高雄市" },
];

const Search = ({ params }: { params: { city: string } }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div className="flex -space-x-px">
        <div className="w-1/2 min-w-0 flex-1">
          <ReactSelect
            instanceId="city-select" // 為 react-select 設置一個固定的 instanceId
            options={options}
            value={
              //   options.find((option) => option.value === params.city) ||
              options[0]
            }
          />
        </div>
        <div className="min-w-0 flex-1">
          <DatePicker
            selected={startDate}
            className="relative block w-full border-0 bg-transparent py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2"
            wrapperClassName="w-full"
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <MagnifyingGlassIcon
            className="-ml-0.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
      <RoomAllocation />
    </div>
  );
};

export default Search;
