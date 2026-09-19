# seximal_clock — what changed, in plain words

This is the whole history of the seximal clock, newest first, written for someone who has never seen the code. The clock splits the day the base-thirty-six way: 36 hours to a day, 36 minutes to an hour and 36 seconds to a minute, each written as one digit from 0–9 then A–Z. It began on 24.0104 as a round clock face, became circles turning inside circles, and has been hexagons rolling around hexagons since 24.0110. Every entry is one step that reached the main version: a single change, or a day's changes on one topic (there have been no pull requests yet).

**How to read an entry**
- The heading names the change, links to the full technical detail on GitHub, and says when it landed (YY.MMDD.HHMM, Boise time).
- A bigger entry lists its parts underneath; each part's name links to the exact change that made it.
- **New:** something you can see or use · **Fixed:** a problem that no longer happens · **Behind the scenes:** a real change you can't see.
- "(Later replaced …)" means that version is gone and says what took its place.
- No entry has a **Try it:** line. The clock is a single piece meant to be placed inside a React web page, and this project has no page of its own to open.

*Written from the git history on 26.0918 and checked against the code of that day. From then on, each pull request carries its own entry and it is added here automatically when the pull request merges.*

## March 2026

**The clock keeps one timer running** · [commit ca6f1b2](https://github.com/travis-horton/seximal_clock/commit/ca6f1b2) · merged 26.0309.1154 · v1.4.2
- Behind the scenes: the clock redraws itself 50 times a second, and it used to throw its timer away and start a new one after every single redraw. It now starts one timer when it first appears and keeps it.

## July 2024

**Tidier lists** · [commit 2cbcab4](https://github.com/travis-horton/seximal_clock/commit/2cbcab4) · merged 24.0702.1602 · v1.4.1
- Behind the scenes: the list of base-36 digits and the list of month names were rewritten in one consistent style. Nothing the clock shows changed.

## January 2024

**Design pictures saved with the project** · [commit 83d0c83](https://github.com/travis-horton/seximal_clock/commit/83d0c83) · merged 24.0112.0724 · v1.4.0
- New: a notes folder holds three pictures the design worked from: a hexagon patterned with small striped triangles, rings of hexagons nested around one another on a honeycomb grid, and a picture of the earlier circle version of the clock showing January.

**The rolling-hexagon clock works** · [commits](https://github.com/travis-horton/seximal_clock/commits/main?since=2024-01-10&until=2024-01-10) · merged 24.0110.1609 · v1.3.0
- **[Hexagons roll around each other](https://github.com/travis-horton/seximal_clock/commit/5206d67)** · merged 24.0110.1145
  New: the minutes hexagon now tumbles, corner over corner, around the edges of a bigger hexagon, and the seconds hexagon tumbles around the minutes one, once around per base-36 minute. Each hexagon is a third the size of the one it rolls around. One known flaw was left in, and the code still marks it as a to-do: the tumbling doesn't yet allow for one extra turn.
- **[A clock face and the time in digits](https://github.com/travis-horton/seximal_clock/commit/3202ed0)** · merged 24.0110.1206
  New: hours are back as the biggest rolling hexagon, a still outer hexagon is drawn around everything as the clock's face, and the time is written out in base-36 digits as hours:minutes:seconds. The drawing area was widened to fit, and the hexagons' outlines are a little thicker.
- **[Decorative triangles](https://github.com/travis-horton/seximal_clock/commit/a9ad0d0)** · merged 24.0110.1439
  New: every hexagon now carries six small blue triangles, one on each side, after the striped triangles in the design picture.
- **[The day starts straight up](https://github.com/travis-horton/seximal_clock/commit/365cd59)** · merged 24.0110.1609
  Fixed: the clock face was tilted, so the point where each day starts sat at its upper-left corner. It is now turned 30 degrees, so that point is straight up at the top. (The change was titled "Noon should be straight up", but the clock counts its day from midnight in Greenwich, UTC, so the top marks midnight UTC, not local noon.)

**On the way to rolling hexagons** · [commits](https://github.com/travis-horton/seximal_clock/commits/main?since=2024-01-08&until=2024-01-08) · merged 24.0108.2234 · v1.2.2
- **[Missing pieces saved](https://github.com/travis-horton/seximal_clock/commit/1bd4aa4)** · merged 24.0108.0841
  Fixed: the changes of 24.0106 and 24.0107 relied on building blocks (the hexagon drawing and the geometry it uses) that had never been saved to the project, so the saved copy couldn't run. They are saved now; this version of the hexagon also drew two small grey triangles along each side.
- **[First try at rolling](https://github.com/travis-horton/seximal_clock/commit/3ec925f)** · merged 24.0108.2234
  Behind the scenes: a first attempt at making each smaller hexagon tip over along the edges of the bigger one, noted at the time as not working yet. The clock now showed a still hexagon with a minutes hexagon and a seconds hexagon, and the grey triangles were set aside for later.

**Hexagons only, seconds only** · [commit 70f87ec](https://github.com/travis-horton/seximal_clock/commit/70f87ec) · merged 24.0107.2159 · v1.2.1
- Behind the scenes: while working out how hexagons should move, the clock was cut back to a still hexagon and a smaller one that moves with the seconds; the circles and their labels were switched off. The month, weekday, hour and minute layers went with them: hours and minutes came back on 24.0110, the month and weekday never did.

**Circles inside circles, then hexagons** · [commits](https://github.com/travis-horton/seximal_clock/commits/main?since=2024-01-06&until=2024-01-06) · merged 24.0106.2235 · v1.2.0
- **[Five circles, month down to second](https://github.com/travis-horton/seximal_clock/commit/38bb8b6)** · merged 24.0106.1317
  New: the clock became five circles, each turning around the inside of the next bigger one: month, day of the week, hour, minute and second. Each circle is three times the size of the one inside it; the biggest is labelled with the month's name and the rest with a digit. (Later replaced on 24.0107 by the hexagon version, which dropped the month and weekday.)
- **[A hexagon on every circle](https://github.com/travis-horton/seximal_clock/commit/66f70ea)** · merged 24.0106.2235
  New: a hexagon is drawn over each circle and turns with it, the first step toward a clock made of hexagons.

**The clock learns to nest** · [commits](https://github.com/travis-horton/seximal_clock/commits/main?since=2024-01-05&until=2024-01-05) · merged 24.0105.0900 · v1.1.0
- **[Second fix of the first version](https://github.com/travis-horton/seximal_clock/commit/4196e78)** · merged 24.0105.0527
  Fixed: the last of the two errors that stopped the first version from drawing: the number of labels around the face and their list were never properly declared. With this, the first clock could draw.
- **[Reorganised, digit moved to the top](https://github.com/travis-horton/seximal_clock/commit/5e0b556)** · merged 24.0105.0535
  Behind the scenes: the tick marks and the labels around the face became separate pieces of the drawing. One visible change came with it: the seconds digit moved from the middle of the face up to the top.
- **[Time as units inside units](https://github.com/travis-horton/seximal_clock/commit/f5e5f11)** · merged 24.0105.0816
  New: the clock was rebuilt so one unit of time can sit inside another: a big circle showing a stand-in digit, with a smaller circle for the seconds turning around its centre, each labelled with its base-36 digit. The old face (tick marks, labels and the moving dot) is no longer drawn, and the clock now redraws 50 times a second instead of 20.
- **[Leftover removed](https://github.com/travis-horton/seximal_clock/commit/3922180)** · merged 24.0105.0817
  Behind the scenes: removed a leftover piece of the rebuild that nothing used.
- **[True nesting, no turning yet](https://github.com/travis-horton/seximal_clock/commit/fcf911b)** · merged 24.0105.0900
  Behind the scenes: work toward circles that truly nest: seconds inside minutes inside a stand-in. For now every circle is drawn around the same centre and none of them turns.

**The first clock** · [commits](https://github.com/travis-horton/seximal_clock/commits/main?since=2024-01-04&until=2024-01-04) · merged 24.0104.0903 · v1.0.0
- **[A base-36 seconds clock](https://github.com/travis-horton/seximal_clock/commit/5e0c874)** · merged 24.0104.0746
  New: a round clock face for base-36 time, where one second lasts about 1.85 ordinary seconds. A dot travels once around the face every base-36 minute, past tick marks and the labels 0 to 5, with the current second written as a digit in the middle. It counts the day from midnight in Greenwich (UTC), not local midnight, and still does today.
- **[First fix](https://github.com/travis-horton/seximal_clock/commit/1e80da6)** · merged 24.0104.0902
  Fixed: the first version stopped with an error before drawing anything, because the number of tick marks was never properly declared. This fixed that one; the same problem with the labels was fixed on 24.0105.
- **[Grey only behind the clock](https://github.com/travis-horton/seximal_clock/commit/6ecf7d3)** · merged 24.0104.0903
  Fixed: the grey background covered the whole web page the clock sat in. It now fills only the clock's own drawing area.
