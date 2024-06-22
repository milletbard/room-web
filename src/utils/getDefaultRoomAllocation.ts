import { Allocation, Guest, Room } from "@/type";

export const getDefaultRoomAllocation = (guest: Guest, rooms: Room[]) => {
  // 初始化最佳分配方案和最低總價格
  let bestAllocation: Allocation[] = [];
  let lowestTotalPrice = Infinity;

  // 遞迴嘗試所有可能的分配方案
  function allocate(
    guestLeft: Guest,
    roomsLeft: Room[],
    currentAllocation: Allocation[],
    currentPrice: number
  ) {
    if (guestLeft.adult === 0 && guestLeft.child === 0) {
      // 所有人都已分配，檢查是否為更佳方案
      if (currentPrice < lowestTotalPrice) {
        lowestTotalPrice = currentPrice;
        bestAllocation = currentAllocation.slice();
      }
      return;
    }

    if (roomsLeft.length === 0) {
      // 沒有更多的房間可以分配
      return;
    }

    const room = roomsLeft[0];
    const remainingRooms = roomsLeft.slice(1);

    // 嘗試所有可能的大人與小孩的分配組合
    for (
      let adults = 1;
      adults <= guestLeft.adult && adults <= room.capacity;
      adults++
    ) {
      for (
        let children = 0;
        children <= guestLeft.child && adults + children <= room.capacity;
        children++
      ) {
        const price =
          room.roomPrice +
          adults * room.adultPrice +
          children * room.childPrice;

        allocate(
          {
            adult: guestLeft.adult - adults,
            child: guestLeft.child - children,
          },
          remainingRooms,
          currentAllocation.concat([
            { adult: adults, child: children, price: price },
          ]),
          currentPrice + price
        );
      }
    }
  }

  allocate(guest, rooms, [], 0);

  return bestAllocation;
};
