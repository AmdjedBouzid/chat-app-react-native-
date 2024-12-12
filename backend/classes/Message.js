class Message {
  constructor(
    id = null,
    idSender = null,
    idChat = null,
    image = null,
    msg = null,
    seenBy = null
  ) {
    this.id = id;
    this.idSender = idSender;
    this.idChat = idChat;
    this.image = image;
    this.msg = msg;
    this.seenBy = seenBy;
  }

  toString() {
    return `Message: { id: ${this.id}, idSender: ${this.idSender}, idChat: ${
      this.idChat
    }, msg: ${this.msg}, image: ${
      this.image ? this.image : "No image"
    } ,seenBy: ${this.seenBy}`;
  }
}

module.exports = Message;
