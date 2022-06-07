This repository is a monorepo and makes use of [Turborepo](https://turborepo.org/) and PNPM workspaces.

## Set up

Before you begin, make sure you have the following set up on your local machine.

- Install [NodeJS v16.x (LTS)](https://nodejs.org/en/)
- Install [PNPM](https://pnpm.io/installation)

> All commands below should be run at the root level of the cloned repository.

### Install package dependencies

```bash
pnpm install
```

### Development setup

You can run all the packages in development mode using the following command:

```bash
pnpm dev
```

### Build

You can build all packages using the following command:

```bash
pnpm build
```

### Change logs

To generate a changelog entry, run the following command:

```sh
pnpm changeset
```

### Storybook

Storybook is setup on a per package basis, you can run storybook for all packages at the same time using the following command:

```bash
pnpm storybook
```

Or you can run storybook for individual packages using the following command:

```bash
pnpm storybook:[dirname]
```

For react it would be

```bash
pnpm storybook:react
```
