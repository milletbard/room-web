import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { DateRange, Range } from "react-date-range";
import dayjs from "dayjs";
import Button from "../share/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WEEK_MAP } from "@/constants";

interface DateRangePickerModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DateRangePickerModal = (props: DateRangePickerModalProps) => {
  const { open, setOpen } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkInDate = searchParams.get("check_in_date") || "";
  const checkOutDate = searchParams.get("check_out_date") || "";

  const [dateRange, setDateRange] = useState<Range>({
    startDate: checkInDate ? new Date(checkInDate) : new Date(),
    endDate: checkOutDate ? new Date(checkOutDate) : new Date(),
    key: "selection",
  });

  const startDateText = `${dayjs(dateRange.startDate).format("YYYY/MM/DD")}(${
    WEEK_MAP[dayjs(dateRange.startDate).day()]
  })`;

  const endDateText = `${dayjs(dateRange.endDate).format("YYYY/MM/DD")}(${
    WEEK_MAP[dayjs(dateRange.endDate).day()]
  })`;

  const stayingDay = dayjs(dateRange.endDate).diff(
    dayjs(dateRange.startDate),
    "day"
  );

  const handleSubmit = () => {
    const searchQuery = new URLSearchParams(searchParams);
    searchQuery.set(
      "check_in_date",
      dayjs(dateRange.startDate).format("YYYY-MM-DD")
    );
    searchQuery.set(
      "check_out_date",
      dayjs(dateRange.endDate).format("YYYY-MM-DD")
    );
    const url = `${pathname}?${searchQuery.toString()}`;
    router.push(url);

    setOpen(false);
  };
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      選擇日期
                    </DialogTitle>

                    <DateRange
                      minDate={new Date()}
                      editableDateInputs={true}
                      onChange={(item) => {
                        setDateRange(item.selection);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={[dateRange]}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {stayingDay > 0 && (
                    <div className="flex justify-center text-sm text-gray-500 mb-2">
                      <span>{`${startDateText} ~ ${endDateText} ${stayingDay}, 晚`}</span>
                    </div>
                  )}

                  <Button
                    disabled={stayingDay <= 0}
                    type="button"
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    確認
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DateRangePickerModal;
