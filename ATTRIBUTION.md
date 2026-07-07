# Game data attribution

Character, Light Cone, and Relic JSON used by `scripts/import-game-data.mjs` comes from:

**[coralie6626/hsr-databank](https://github.com/coralie6626/hsr-databank)** — Honkai Star Rail game data (characters, light cones, relics).

## How we use it

1. Run `npm run import:game` to pull JSON and generate markdown stubs in `src/content/`.
2. Imported files are marked `gameData: true` and `draft: true` by default.
3. Edit each file — especially **## At the table** — for your campaign. Do not ship raw game story text to players without reviewing it.

## Optional: vendor clone

```bash
git clone https://github.com/coralie6626/hsr-databank.git vendor/hsr-databank
npm run import:game:local
```

## License

Check the upstream repository for license terms before redistributing imported content.
