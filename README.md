# Drink&Talk

Drink&Talk app is made for you and your buddies to help you put front and center the most important thing when hanging out: communication without unnecessary phone checks. Simply create a game which the rest of your crew will join. During the countdown rest your phones on the table and do not touch them until the time runs out. Else, the loser of the game has to pay for a round for the entire crew. Have fun! 🙂

## 🛠️ Branches

| Name      | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| `master`  | Code that is currently deployed on production                         |
| `develop` | Contains code with new (not yet deployed) changes                      |

## 💡 Technologies
Backend web socket server is written in Typescript and powered by Node.js and Socket.io. Jest is used for unit testing.

## 🚧 Development
Clone the repo and run `yarn` in the root folder.

## 🚀 Deployment

We are using Heroku for deployments. Code is deployed on each push to the master branch.

## 🧪 Tests
We are using Jest to unit test our code and are maintaining a test coverage of 100%. Tests can be run using the following command:

`yarn test`
