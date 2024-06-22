"use client";

import Alert from "../Alert";
import CustomInputNumber from "../share/CustomInputNumber";
import React, { useMemo } from "react";
import { getDefaultRoomAllocation } from "@/utils/getDefaultRoomAllocation";
import { type Guest, type Room } from "@/type";
import { useForm } from "react-hook-form";

interface RoomAllocationProps {
  guest: Guest;
  rooms: Room[];
  onChange?: (
    values: {
      adult: number;
      child: number;
      price: number;
    }[]
  ) => void;
}

const RoomAllocation = ({ guest, rooms, onChange }: RoomAllocationProps) => {
  const defaultRooms = useMemo(
    () => getDefaultRoomAllocation(guest, rooms),
    [guest, rooms]
  );

  const methods = useForm({
    defaultValues: { rooms: defaultRooms },
  });

  const watchRooms = methods.watch("rooms");

  // 已分配的大人數量
  const allocatedAdult = watchRooms.reduce(
    (total, room) => total + room.adult,
    0
  );
  // 已分配的小孩數量
  const allocatedChild = watchRooms.reduce(
    (total, room) => total + room.child,
    0
  );

  // 尚未分配的大人人數
  const remainingAdult = guest.adult - allocatedAdult;
  // 尚未分配的小孩人數
  const remainingChild = guest.child - allocatedChild;

  return (
    <div className="mt-8 lg:mt-0 max-w-3xl w-full min-w-[600px]">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-2">
        <h2 className="text-xl px-4 sm:px-6 font-semibold truncate">
          {`住客人數： ${guest.adult} 位大人，${guest.child} 位小孩 / ${rooms.length}房`}
        </h2>

        {remainingAdult > 0 || remainingChild > 0 ? (
          <div className="m-4">
            <Alert>
              尚未分配人數，{remainingAdult} 位大人，
              {remainingChild} 位小孩
            </Alert>
          </div>
        ) : (
          <div className="m-4">
            <Alert severity="success">已分配完所有人數，請確認後送出</Alert>
          </div>
        )}

        <form>
          <ul role="list" className="divide-y divide-gray-500">
            <li className="flex">
              <div className="ml-6 flex flex-1 flex-col divide-y">
                {defaultRooms.map((room, index) => {
                  const currentAdult = methods.getValues(
                    `rooms.${index}.adult`
                  );
                  const currentChild = methods.getValues(
                    `rooms.${index}.child`
                  );
                  const total = currentAdult + currentChild;

                  return (
                    <div className="flex" key={index}>
                      <div className="min-w-0 flex-1 my-8">
                        <h4 className="text-lg mb-4 font-normal">
                          房間人數: {total} 人
                        </h4>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <div className="flex flex-col justify-center">
                              <h3>大人</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {`年齡 20+, 上限 ${room.adult} 位`}
                              </p>
                            </div>
                            <CustomInputNumber
                              min={1}
                              max={room.adult}
                              step={1}
                              value={currentAdult}
                              name={`rooms.${index}.adult`}
                              disabled={false}
                              onChange={(e) => {
                                methods.setValue(
                                  `rooms.${index}.adult`,
                                  Math.min(e.target.value, room.adult)
                                );
                                const newData = methods.getValues(`rooms`);
                                onChange && onChange(newData);
                                // console.log("trigger adult onChange", e);
                              }}
                              // for test
                              // onBlur={(e) =>
                              //   console.log("trigger adult onBlur", e)
                              // }
                              // onInput={(e) =>
                              //   console.log("trigger adult onInput", e)
                              // }
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="flex flex-col justify-center">
                              <h3>小孩</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {`上限 ${room.adult} 位`}
                              </p>
                            </div>
                            <CustomInputNumber
                              min={0}
                              max={room.child}
                              step={1}
                              value={currentChild}
                              name={`rooms.${index}.child`}
                              disabled={false}
                              onChange={(e) => {
                                methods.setValue(
                                  `rooms.${index}.child`,
                                  Math.min(e.target.value, room.child)
                                );
                                const newData = methods.getValues(`rooms`);
                                onChange && onChange(newData);

                                // console.log("trigger child onChange", e);
                              }}
                              // for test
                              // onBlur={(e) =>
                              //   console.log("trigger child onBlur", e)
                              // }
                              // onInput={(e) =>
                              //   console.log("trigger child onInput", e)
                              // }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default RoomAllocation;
