export const guestA = { adult: 4, child: 2 };
export const roomsA = [
  { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
];

export const guestB = { adult: 7, child: 3 };
export const roomsB = [
  { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
  { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
  { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
];

export const guestC = { adult: 16, child: 0 };
export const roomsC = [
  { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
  { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
  { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
  { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
];

export const guestOptions = [
  { value: guestA, label: "大人: 4 小孩: 2", type: "A" },
  { value: guestB, label: "大人: 7 小孩: 3", type: "B" },
  { value: guestC, label: "大人: 16 小孩: 0", type: "C" },
];

export const roomsOptions = [
  {
    value: roomsA,
    type: "A",
    label: "房型資料 A",
  },
  {
    value: roomsB,
    type: "B",
    label: "房型資料 B",
  },
  {
    value: roomsC,
    type: "C",
    label: "房型資料 C",
  },
];
