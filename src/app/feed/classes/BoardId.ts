export default class BoardId {
  private static _id = -1;

  static get id(): number {
    BoardId._id++;
    return BoardId._id;
  }
}
