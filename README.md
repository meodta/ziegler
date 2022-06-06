## Exercise 1

## Part 1
Please build an backend app which will be written in Nest.js and will use MongoDB.

Example data to use: https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json

API needs to be able to:
- return a list of all possible unique ingredients (variations of a products can be treated as unique ones)
- return a list of all possible unique ingredients types (baking/drinks etc)
- return a list of all possible recipes (with support for pagination)
- return all of the recipes that uses provided products
- return all of the recipes that total cook time (sum of a timers) will not exceed provided value
- return one recipe by provided id

Tips:
- You can normalize data, add ids etc.
- There should be a data migration that will sync the data from the JSON with the local DB only once (at initial app start)
- Fork this repo and share it with us
- If you have any questions, please contact jan@zieglerlabs.com

## Part 2
Please use React.js and selected UI Kit (we use Chakra internally so it is preferred one).
The UI should contain two views:
- List of all possible recipes, you can show only 3 recipes at the same time (use infinite scroll or pagination).
- Every recipe should contain picture, name, ingredients, total cook time and source url.
- There should be also the possibility to filter recipes by ingredients type (multi select), ingredients (multi select - it should contain only results corresponding to the previous selection) and total cook time.
- Extended view of selected recipe containing all of the data in readable way.

## Running existing docker
1. Set `.env` file like this:

```
API_PORT=4000
API_URL=0.0.0.0:4000/app

MONGO_URL=db:27017
MONGO_DB_NAME=example
MONGO_USERNAME=example_user
MONGO_PASSWORD=example_pass
```
2. Run `make dev-build`.
3. Run `make dev-start`.
