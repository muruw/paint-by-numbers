## PAINT BY NUMBERS

### Latest version

![2022-09-09](./static/progress/2022-09-09.png)

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Setup

In IntelliJ, import code style by navigating to

Code style -> Javascript -> Set from (Google Javascript Style Guide)

### Formatter & Linter

Start the project:

```
deno fmt
```

[More info: Deno built in formatter](https://deno.land/manual@v1.25.2/tools/formatter)

```
deno lint
```

[More info: Deno built in linter](https://deno.land/manual@v1.25.2/tools/linter)

This will watch the project directory and restart as necessary.

## Styling

This project uses Twind, which is a small compiler (~13kB) that converts
Tailwind utility classes into CSS at runtime.

[Twind Guide](https://twind.dev/handbook/introduction.html)

[Twind colors list.](https://twind.dev/api/modules/twind_colors.html) It exposes
all Tailwind.css v2 colors

Base styling is set in ./twind.config.ts

[![Made with Fresh](https://fresh.deno.dev/fresh-badge-dark.svg)](https://fresh.deno.dev)
