// user.js
class User {
  constructor(
    id = null,
    image = null,
    firstName = null,
    lastName = null,
    bio = null,
    email = null,
    birthDate = null
  ) {
    this.id = id;
    this.image = image;
    this.firstName = firstName;
    this.lastName = lastName;
    this.bio = bio;
    this.email = email;
    this.birthDate = birthDate;
  }

  toString() {
    return `User: { id: ${this.id}, name: ${this.firstName} ${
      this.lastName
    }, email: ${this.email}, bio: ${this.bio}, birthDate: ${
      this.birthDate ? this.birthDate.toISOString().split("T")[0] : "N/A"
    } }`;
  }
}

module.exports = User;
