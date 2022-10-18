const User = require("../models/User");

class UserController {
  getUser(id) {
    return {
      id: 1,
      name: "Tiago Silva (Brad Pitt)",
    };
  }

  getUsers() {
    return [
      {
        id: 1,
        name: "Tiago Silva (Brad Pitt)",
      },
      {
        id: 2,
        name: "Michael Jaquison",
      },
      {
        id: 3,
        name: "Michael Jaquison",
      },
      {
        id: 4,
        name: "Michael Jaquison",
      },
    ];
  }
}

module.exports = UserController;
