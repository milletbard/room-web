"use client";

import Button from "../share/Button";
import DateRangePickerModal from "../DateRangePickerModal";
import React from "react";
import ReactSelect from "../share/RaectSelect/ReactSelect";
import dayjs from "dayjs";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useBoolean } from "usehooks-ts";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SECRET_DOMAIN, CITY_DATA, WEEK_MAP } from "@/constants";
import { decrypt } from "@/utils/crypto";
import { Guest } from "@/type";

const gogoTravelDomain = decrypt(
  SECRET_DOMAIN,
  process.env.NEXT_PUBLIC_ID || ""
);

interface LocationSelectorProps {
  guest: Guest;
}

const LocationSelector = ({ guest }: LocationSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { city } = useParams();

  const checkInDate = searchParams.get("check_in_date");
  const checkOutDate = searchParams.get("check_out_date");

  const { value: modalOpenValue, setValue: setModalOpenValue } =
    useBoolean(false);

  const startDateText =
    checkInDate &&
    `${dayjs(checkInDate).format("YYYY/MM/DD")}(${
      WEEK_MAP[dayjs(checkInDate).day()]
    })`;

  const endDateText =
    checkOutDate &&
    `${dayjs(checkOutDate).format("YYYY/MM/DD")}(${
      WEEK_MAP[dayjs(checkOutDate).day()]
    })`;

  const stayingDay =
    checkOutDate && dayjs(checkOutDate).diff(dayjs(checkInDate), "day");

  const selectedCity = CITY_DATA.find((option) => option.value === city);

  const canSearch =
    !!selectedCity &&
    !!checkInDate &&
    !!checkOutDate &&
    !!stayingDay &&
    stayingDay > 0;

  const inputText = canSearch
    ? `${startDateText} - ${endDateText} 共 ${stayingDay} 天`
    : "";

  const handleOpenModal = () => setModalOpenValue(true);

  const handleCityChange = (option: { value: string; label: string }) => {
    const { value } = option;
    router.push(`/search/${value}` + "?" + searchParams.toString());
  };

  const handleSearch = () => {
    // number to array
    const childAges = Array.from({ length: guest.child }, (_, i) => i + 1);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("adult", String(guest.adult));
    newSearchParams.set("childAges", childAges.join(","));

    window.open(
      `${gogoTravelDomain}/list/tw/${city}` + "?" + newSearchParams.toString(),
      "_blank"
    );
  };

  return (
    <div className="flex -space-x-px">
      <DateRangePickerModal open={modalOpenValue} setOpen={setModalOpenValue} />

      <div className="min-w-0 flex-1">
        <ReactSelect
          styles={{
            control: (provided) => ({
              ...provided,
              boxShadow: "none",
              borderColor: "#D1D5DB",
              "&:hover": {
                borderColor: "#D1D5DB",
              },
              borderBottomRightRadius: 0,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 6,
              borderBottomLeftRadius: 6,
            }),
          }}
          instanceId="city-select"
          options={CITY_DATA}
          placeholder="城市"
          value={selectedCity}
          onChange={(option) => {
            handleCityChange(option as { value: string; label: string });
          }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <input
          readOnly
          type="text"
          placeholder="日期, 住幾晚"
          value={inputText}
          onClick={handleOpenModal}
          className="block w-full h-full text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-insetsm:text-sm sm:leading-6 pl-2 cursor-pointer"
        />
      </div>

      <Button
        onClick={handleSearch}
        disabled={!canSearch}
        type="button"
        className="relative -ml-px inline-flex items-center gap-x-1.5  rounded-r-md rounded-l-none px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        icon={
          <MagnifyingGlassIcon
            className="-ml-0.5 h-5 w-5 text-white"
            aria-hidden="true"
          />
        }
      />
    </div>
  );
};

export default LocationSelector;
