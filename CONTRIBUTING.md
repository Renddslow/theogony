# Contributing

## Setup

Install [Node.js (LTS)](https://nodejs.org/) and [yarn](https://yarnpkg.com/en/docs/install) on your system.

### Install Dependencies

```
git clone https://github.com/Renddslow/theogony
cd theogony
yarn
```

### Run locally

```
yarn try
```

While the intent is to have this operating as a function-based module with an eye to deploying it with a web-app, local testing is managed via a CLI. Currently you can pass a `seed` as an arg as well as a desired `--mythos` via flags.

> **Note**: At present, you can produce a result without a see when given the mythos flag, but the same mythos flag must be present when repeating. I am _very_ open to solving this however.

## Pull Requests

## License

By contributing to Theogony, you agree that your contributions will be licensed under [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
