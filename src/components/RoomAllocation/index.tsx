"use client";

import React from "react";
import Alert from "../Alert";
import InputNumber from "../share/CustomInputNumber";

const RoomAllocation = () => {
  return (
    <div className="mt-10 lg:mt-0 max-w-3xl w-full min-w-[600px]">
      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-6">
        <h2 className="text-xl px-4 sm:px-6 font-semibold truncate">
          住客人數： 7 位大人，3位小孩 / 3房
        </h2>
        <div className="m-4">
          <Alert>尚未分配人數，4位大人，3位小孩</Alert>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          <li className="flex  py-6">
            <div className="ml-6 flex flex-1 flex-col">
              <div className="flex">
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg mb-4 font-normal">房間人數: 1 人</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center">
                        <h3>大人</h3>
                        <p className="mt-1 text-sm text-gray-500">年齡20+</p>
                      </div>
                      <InputNumber />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center">
                        <h3>小孩</h3>
                      </div>
                      <InputNumber />
                    </div>
                  </div>
                </div>

                <div className="ml-4 flow-root flex-shrink-0">
                  <button
                    type="button"
                    className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Remove</span>
                    {/* <TrashIcon className="h-5 w-5" aria-hidden="true" /> */}
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">$64.00</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Shipping</dt>
            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Taxes</dt>
            <dd className="text-sm font-medium text-gray-900">$5.52</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-gray-900">$75.52</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default RoomAllocation;
