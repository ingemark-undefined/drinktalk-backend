export type RoomData = {
  time: number;
};

export type Rooms = {
  [key: string]: RoomData;
};

export enum ERROR {
  USER_TAKEN = 'UserTaken',
  GAME_DOES_NOT_EXIST = 'GameDoesNotExist',
}
