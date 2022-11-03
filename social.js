// Implement the SocialNetwork class here
class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    let user = {
      id: ++this.currentID,
      name: name,
    };
    this.users[user.id] = user;
    this.follows[user.id] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    if (!this.users[userID2] || this.follows[userID1].has(userID2)) {
      return false;
    } else {
      this.follows[userID1].add(userID2);
    }
    return true;
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    //   const followers = new Set();
    //   const values = Object.values(this.follows);

    //   for (let i = 0; i < values.length; i++) {
    //     let userFollows = values[i];

    //     if (userFollows.has(userID)) {
    //       followers.add(i + 1);
    //     }
    //   }
    //   return followers;
    // }

    const followers = new Set();
    for (let id in this.follows) {
      if (this.follows[id].has(userID)) {
        followers.add(Number(id));
      }
      return followers;
    }
  }

  // getRecommendedFollows(userID, degrees) {

  //   const recommended = new Array();
  //   let queue = [[this.getUser[userID]]];
  //   const visited = new Set();

  //   while (queue.length) {
  //     let path = queue.shift();

  //     // DO THE THING
  //     let recommendee = path[path.length - 1];
  //     if (path[path.length - 1] < degrees) recommended.push(recommendee)



  //     for (let neighbor of this.getFollows(recommendee)) {
  //       if (!visited.has(neighbor)) {
  //         queue.push([...recommendee, neighbor]);

  //         visited.add(neighbor);
  //       }
  //     }
  //   }

  //   return recommended;
  // }


  // getRecommendedFollows(userID, degrees) {
  //   // Your code here
  //   let recommended = [];
  //   let queue = [[this.getUser(userID)]];
  //   let visited = new Set();

  //   while (queue.length > 0) {
  //     let path = queue.shift();
  //     let currentPerson = path[path.length - 1];

  //     if (!visited.has(currentPerson)) {
  //       visited.add(currentPerson);

  //       if (path.length > 2 && path.length - 2 <= degrees) {
  //         recommended.push(currentPerson.id);
  //       }

  //       let follows = this.getFollows(currentPerson.id);
  //       follows.forEach(
  //         follow => {
  //           let newPath = path.concat(this.getUser(follow));
  //           queue.push(newPath);
  //         }
  //       );
  //     }
  //   }
  //   return recommended;
  // }


  getRecommendedFollows(userID, degrees) {
    let recommended = []
    let queue = [[userID]]
    let visited = new Set([userID])

    while (queue.length > 0) {
      let currPath = queue.shift()
      let currUser = currPath[currPath.length - 1]
      console.log(currPath, currUser)

      // if currPath is greater than 2 & the seperation degree = degree passed in as arg;
      // cannot evaluate for a path of 2 bc degree is less than 1 => prevents infinite loop (gatekeeper)
      if (currPath.length > 2 && currPath.length - 2 <= degrees) {
        console.log(currPath.length)
        // & if user is not same as passed in arg + does not follow currUser;
        if (currUser !== userID && !this.follows[userID].has(currUser)) {
          // add currUser to recommended
          recommended.push(currUser)
        }
      }

      
      // iterate through currUser's followers
      let follows = [...this.getFollows(currUser)]
      console.log(follows)

      // for each ID, if we havent visited add to visited + push the currPath + id into queue
      follows.forEach((id) => {
        if (!visited.has(id)) {
          visited.add(id)
          queue.push([...currPath, id])
        }
      })
    }
    let res = [...recommended]
     return res
  }
}








module.exports = SocialNetwork;
