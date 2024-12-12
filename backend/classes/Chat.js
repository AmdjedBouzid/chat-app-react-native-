class Chat {
  constructor(
    id = null,
    dataCreation = null,
    numberMembers = null,
    state = null,
    name = null,
    lastMessageAt = null,
    lastMessage = null
  ) {
    this.id = id;
    this.dataCreation = dataCreation;
    this.numberMembers = numberMembers;
    this.state = state;
    this.name = name;
    this.lastMessageAt = lastMessageAt;
    this.lastMessage = lastMessage;
  }

  toString() {
    return `Chat: { id: ${this.id}, name: ${this.name}, state: ${
      this.state
    }, numberMembers: ${this.numberMembers}, lastMessageAt: ${
      this.lastMessageAt ? this.lastMessageAt.toISOString() : "N/A"
    } }`;
  }
}

module.exports = Chat;
